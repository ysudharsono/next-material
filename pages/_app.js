import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS

import { config } from '@fortawesome/fontawesome-svg-core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import withRedux from 'next-redux-wrapper';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import LoadingBar from '../components/Loading';
import Snackbar from '../components/Snackbar';
import makeStore from '../lib/redux';
import theme from '../lib/theme';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const MyApp = ({ Component, pageProps, store }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <LoadingBar />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Snackbar />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>

      {/* <style jsx global>{`
        html,
        body {
          display: grid;
          transition: all 0.5s;
          user-select: none;
          background: linear-gradient(to bottom, white, black);
        }
      `}</style> */}
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default withRedux(makeStore)(MyApp);
