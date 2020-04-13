/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Link from 'next/link';
import { connect } from 'react-redux';

import { deauthenticate } from '../lib/redux/actions/authA';

const Layout = ({ children, title, deauthenticate, isAuthenticated }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <div>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link href="/signin">
              <a>Sign In</a>
            </Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </li>
        )}

        {isAuthenticated && (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li onClick={deauthenticate}>
            <a>Sign Out</a>
          </li>
        )}

        <li>
          <Link href="/whoami">
            <a>Who Am I</a>
          </Link>
        </li>
      </ul>
    </div>

    <div className="has-text-centered">{children}</div>
  </div>
);

const mapStateToProps = (state) => ({ isAuthenticated: !!state.auth.token });

export default connect(mapStateToProps, { deauthenticate })(Layout);
