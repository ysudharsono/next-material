import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout';
import withAuth from '../components/withAuth';

const Private = () => {
  const user = useSelector((state) => state.auth.user);

  const name = user ? `${user.email}` : 'Anonymous';

  return (
    <Layout>
      <h1>Hello {name}!</h1>
      <p>This content is available for logged in users only.</p>
      <Link href="/">
        <a>Link to the home page</a>
      </Link>
    </Layout>
  );
};

export default withAuth()(Private);
