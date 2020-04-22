import { Button, Link as MuiLink } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Snackbar from '../components/Snackbar';
import withAuth, { PUBLIC } from '../components/withAuth';
import { signout } from '../lib/redux/actions/authA';

const Home = (props) => {
  const { signout, user } = props;
  const name = user ? `${user.email}` : 'Anonymous';

  const handleSignout = () => {
    signout();
  };

  return (
    <div>
      <h1>Hello {name}!</h1>
      <div>
        <Link href="/private">
          <MuiLink>Link to a private page</MuiLink>
        </Link>
      </div>
      <div>
        <Link href="/private-perm-required">
          <Button appearance="link">
            Link to a private page with specific permission requirement
          </Button>
        </Link>
      </div>
      {user === null ? (
        <div>
          <div>
            <Link href="/signin">
              <Button appearance="link">Sign In</Button>
            </Link>
          </div>
          <div>
            <Link href="/register">
              <Button appearance="link">Register</Button>
            </Link>
          </div>
        </div>
      ) : (
        <Button appearance="link" onClick={handleSignout}>
          Sign Out
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = { signout };

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuth(PUBLIC))(Home);
