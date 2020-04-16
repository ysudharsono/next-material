import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

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
          <Button type="link">Link to a private page</Button>
        </Link>
      </div>
      <div>
        <Link href="/private-perm-required">
          <Button type="link">Link to a private page with specific permission requirement</Button>
        </Link>
      </div>
      {user === null ? (
        <div>
          <div>
            <Link href="/signin">
              <Button type="link">Sign In</Button>
            </Link>
          </div>
          <div>
            <Link href="/register">
              <Button type="link">Register</Button>
            </Link>
          </div>
        </div>
      ) : (
        <Button type="link" onClick={handleSignout}>
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

const mapDispatchToProps = (dispatch) => {
  return { signout: bindActionCreators(signout, dispatch) };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuth(PUBLIC))(Home);
