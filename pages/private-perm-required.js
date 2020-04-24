import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import withAuth from '../components/withAuth';

const PrivatePermRequired = () => {
  const user = useSelector((state) => state.auth.user);
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

export default withAuth('admin')(PrivatePermRequired);
