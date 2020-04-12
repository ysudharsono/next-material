import React from 'react';
import { connect } from 'react-redux';

const Index = (props) => {
  const { foo, custom } = props;
  return (
    <div>
      <div>Prop from Redux {JSON.stringify(foo)}</div>
      <div>Prop from getInitialProps {custom}</div>
    </div>
  );
};

Index.getInitialProps = async ({ store, isServer, pathname, query }) => {
  // component will be able to read from store's state when rendered
  store.dispatch({ type: 'FOO', payload: 'foo from index' });
  // you can pass some custom props to component from here
  return { custom: 'custom' };
};

export default connect((state) => state)(Index);
