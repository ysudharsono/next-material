import axios from 'axios';
import Router from 'next/router';

import { getCookie, removeCookie, setCookie } from '../../cookie';

const prefix = 'AUTH';
export const UPDATE = `${prefix}-UPDATE`;

export const authenticate = (user) => (dispatch) =>
  axios
    .post(`http://localhost:8080/api/signin`, user)
    .then((response) => {
      setCookie('token', response.data.token);
      Router.push('/');
      dispatch({ type: UPDATE, payload: response.data.token });
    })
    .catch((err) => console.log(err));

// gets the token from the cookie and saves it in the store
export const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: UPDATE, payload: token });
  };
};

// removing the token
export const deauthenticate = () => {
  return (dispatch) => {
    removeCookie('token');
    Router.push('/');
    dispatch({ type: UPDATE, payload: null });
  };
};

// check if the page is being loaded on the server, and if so, get auth token from the cookie
export const checkServerSideCookie = (ctx) => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const token = getCookie('token', ctx.req);
      ctx.store.dispatch(reauthenticate(token));
    }
  } else {
    const { token } = ctx.store.getState().auth;

    if (token && (ctx.pathname === '/signin' || ctx.pathname === '/signup')) {
      setTimeout(() => {
        Router.push('/');
      }, 0);
    }
  }
};
