import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withAuth from '../components/withAuth';

const Private = (props) => {
  const { user } = props;
  const name = user ? `${user.email}` : 'Anonymous';

  return (
    <div>
      <div>
        <h1>Hello {name}!</h1>
        <p>This content is available for logged in users only.</p>
      </div>
      <div>
        <Link href="/">
          <a>Link to the home page</a>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default compose(connect(mapStateToProps), withAuth())(Private);
