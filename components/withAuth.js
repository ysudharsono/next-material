import Router from 'next/router';
import React from 'react';

import { getCookie } from '../lib/cookie';
// import feathers from '../lib/feathers';
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
 * @param permission: permission required to render this page. Use PUBLIC to make the page public. If empty, then it requires user to log in, but it isn't role-specific
 * @returns function(ChildComponent) React component to be wrapped. Must be a `page` component.
 */
export default (permission = null) => (ChildComponent) => {
  const withAuth = (props) => {
    return <ChildComponent {...props} />;
  };

  const redirectToLogin = (context) => {
    const { isServer, req, res } = context;

    if (isServer) {
      res.redirect(`/signin?next=${req.originalUrl}`);
    } else {
      Router.push(`/signin?next=${context.asPath}`);
    }
  };

  const redirectToUnauthorized = (context) => {
    const { isServer, req, res } = context;

    if (isServer) {
      res.redirect(`/unauthorized?next=${req.originalUrl}`);
    } else {
      Router.push(`/unauthorized?next=${context.asPath}`);
    }
  };

  const userHasPermission = (user) => {
    let userHasPerm = true;
    // go here only if we have specific permission requirements
    if (permission) {
      userHasPerm = user.role && user.role.includes(permission.toLowerCase());
    }
    return userHasPerm;
  };

  withAuth.getInitialProps = async (context) => {
    // public page passes the permission `PUBLIC` to this function
    const isPublicPage = permission === PUBLIC;
    const { isServer, store, req, res } = context;

    if (isServer) {
      // Authenticate, happens on page first load (SSR)
      const token = getCookie('token', req);

      // On server side, always load token if exists
      if (token) {
        // Verify if token is valid
        const success = await store.dispatch(verify(token));
        if (!success) {
          // token not valid or expired, go to login page
          res.clearCookie('token');
          if (!isPublicPage) redirectToLogin(context);
        }
        const { user } = store.getState().auth;
        if (!isPublicPage && !userHasPermission(user)) redirectToUnauthorized(context);
      } else if (!isPublicPage) {
        // If token doesn't exist, go to login page only if it's not a public page
        redirectToLogin(context);
      }
    }
    // client side - check if the Feathers API client is already authenticated previously
    // so we don't need to reauthenticate every time we change page on client-side
    // if (!feathers.isAuthenticated) {

    // Change: Not relying on feathers.isAuthenticated, check every time the page changes to a private one

    if (!isPublicPage) {
      // get the JWT (from cookie - set by previous login or server-side authentication) and use it to auth the API client
      const { token } = store.getState().auth;

      if (token) {
        // Verify if token is valid
        const success = await store.dispatch(verify(token));
        if (!success) {
          // token not valid or expired, go to login page
          redirectToLogin(context);
        }
        const { user } = store.getState().auth;
        if (!userHasPermission(user)) redirectToUnauthorized(context);
      } else {
        // If token doesn't exist, go to login page
        redirectToLogin(context);
      }
    }
    // }
    const pageProps = ChildComponent.getInitialProps
      ? await ChildComponent.getInitialProps(context)
      : {};
    return { pageProps };
  };

  return withAuth;
};
