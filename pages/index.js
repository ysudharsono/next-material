import { Button, Link as MuiLink } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import withAuth, { PUBLIC } from '../components/withAuth';
import { signout } from '../lib/redux/actions/authA';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const name = user ? `${user.email}` : 'Anonymous';

  const handleSignout = () => {
    dispatch(signout());
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

export default withAuth(PUBLIC)(Home);
