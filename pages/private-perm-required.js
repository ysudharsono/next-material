import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withAuth from '../components/withAuth';

const PrivatePermRequired = (props) => {
  const { user } = props;
  const name = user ? `${user.email}` : 'Anonymous';

  return (
    <div>
      <div>
        <h1>Hello {name}!</h1>
        <p>This content is for admin users only.</p>
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

export default compose(connect(mapStateToProps, null), withAuth('admin'))(PrivatePermRequired);
