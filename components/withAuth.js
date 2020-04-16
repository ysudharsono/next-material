import Error from 'next/error';
import Router from 'next/router';
import React, { Component } from 'react';

import { getCookie } from '../lib/cookie';
import feathers from '../lib/feathers';
import { verify } from '../lib/redux/actions/authA';

export const PUBLIC = 'PUBLIC';

/**
 * Higher order component for Next.js `pages` components.
 *
 * NOTE: depends of redux store. So you must use the `withRedux` HOC before this one.
 *
 * Example:
 *
 * ```
 * export default withRedux(initStore, mapStateToProps)(
 *   withAuth(PUBLIC)(MyPage)
 * )
 * ```
 *
 * Or using redux compose function:
 *
 * ```
 * export default compose(
 *   withRedux(initStore, mapStateToProps),
 *   withAuth()
 * )(Private)
 * ```
 *
 * It reads the user from the redux store or calls whoami API to verify current logged in user.
 *
 * To make a page public you have to pass PUBLIC as the `permission` parameter.
 * This is required to be able to show current logged in user from the first server render.
 *
 * @param permission: permission required to render this page. Use PUBLIC to make the page public.
 * @returns function(ChildComponent) React component to be wrapped. Must be a `page` component.
 */
export default (permission = null) => (ChildComponent) =>
  class withAuth extends Component {
    static redirectToLogin(context) {
      const { isServer, req, res } = context;

      if (isServer) {
        res.redirect(`/signin?next=${req.originalUrl}`);
      } else {
        Router.push(`/signin?next=${context.asPath}`);
      }
    }

    static userHasPermission(user) {
      const userGroups = user.groups || [];
      let userHasPerm = true;

      // go here only if we have specific permission requirements
      if (permission) {
        // for instance if the permission is "admin" and the user name starts with admin
        userHasPerm = user.email.toLowerCase().startsWith(permission.toLowerCase());
      }
      return userHasPerm;
    }

    static async getInitialProps(context) {
      // public page passes the permission `PUBLIC` to this function
      const isPublicPage = permission === PUBLIC;
      const { isServer, store, req, res } = context;

      if (isServer) {
        // Authenticate, happens on page first load (SSR)
        const token = getCookie('token', req);

        if (token) {
          // Verify if token is valid
          const success = await store.dispatch(verify(token));
          if (!success) {
            // token not valid or expired, go to login page
            res.clearCookie('token');
            if (!isPublicPage) this.redirectToLogin(context);
          }
        } else if (!isPublicPage) {
          // If token doesn't exist, go to login page only if it's not a public page
          this.redirectToLogin(context);
        }
        return {};

        // client side - check if the Feathers API client is already authenticated previously
        // so we don't need to reauthenticate every time we change page on client-side
      }
      if (!feathers.isAuthenticated) {
        if (isPublicPage) return {};
        // get the JWT (from cookie - set by previous login or server-side authentication) and use it to auth the API client
        const { token } = store.getState().auth;

        if (token) {
          // Verify if token is valid
          const success = await store.dispatch(verify(token));
          if (!success) {
            // token not valid or expired, go to login page
            this.redirectToLogin(context);
          }
        } else {
          // If token doesn't exist, go to login page
          this.redirectToLogin(context);
        }
      }

      // return this.getInitProps(context, store.getState().auth.user, isPublicPage);
    }

    static async getInitProps(context, user, isPublicPage) {
      let proceedToPage = true;
      let initProps = {};

      if (user) {
        // means the user is logged in so we verify permission
        if (!isPublicPage) {
          if (!this.userHasPermission(user)) {
            proceedToPage = false;

            // Show a 404 page (see using next.js' built-in Error page) - TODO does this also work server-side?
            const statusCode = 404;
            initProps = { statusCode };
          }
        }
      } else {
        // anonymous user
        if (!isPublicPage) {
          proceedToPage = false;

          this.redirectToLogin(context);
        }
      }

      if (proceedToPage && typeof ChildComponent.getInitialProps === 'function') {
        initProps = await ChildComponent.getInitialProps(context);
      }

      return initProps;
    }

    render() {
      // Use next's built-in error page
      if (this.props.statusCode) {
        return <Error statusCode={this.props.statusCode} />;
      }

      return <ChildComponent {...this.props} />;
    }
  };
