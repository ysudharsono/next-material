import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import { getPosts } from '../lib/redux/actions/fooA';

const Index = ({ foo, custom, getPosts }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    getPosts();
  };

  return (
    <Layout>
      <div>
        <div>Prop from Redux {JSON.stringify(foo)}</div>
        <button type="button" onClick={handleSubmit}>
          Load
        </button>
        <div>Prop from getInitialProps {custom}</div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async ({ store, isServer, pathname, query }) => {
  // await store.dispatch(getPosts());
  return { custom: 'custom' };
};

export default connect((state) => state, { getPosts })(Index);
