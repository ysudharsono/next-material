import React from 'react';
import { connect } from 'react-redux';

import { getPosts } from '../lib/redux/actions/fooAction';

const Index = (props) => {
  const { foo, custom } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getPosts();
  };

  return (
    <div>
      <div>Prop from Redux {JSON.stringify(foo)}</div>
      <button type="button" onClick={handleSubmit}>
        Load
      </button>
      <div>Prop from getInitialProps {custom}</div>
    </div>
  );
};

Index.getInitialProps = async ({ store, isServer, pathname, query }) => {
  // await store.dispatch(getPosts());
  return { custom: 'custom' };
};

export default connect((state) => state, { getPosts })(Index);
