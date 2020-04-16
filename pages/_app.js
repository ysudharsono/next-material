import 'antd/dist/antd.css';

import withRedux from 'next-redux-wrapper';
import React from 'react';
import { Provider } from 'react-redux';

import LoadingBar from '../components/Loading';
import makeStore from '../lib/redux';

const MyApp = ({ Component, pageProps, store }) => {
  return (
    <>
      <LoadingBar />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default withRedux(makeStore)(MyApp);
