import Router from 'next/router';

import { removeCookie, setCookie } from '../../cookie';
import feathers from '../../feathers';
import snackbar from './snackbarA';

const prefix = 'AUTH';
export const UPDATE = `${prefix}-UPDATE`;

export const signin = (payload, redirectUri) => (dispatch) => {
  return new Promise((resolve, reject) => {
    feathers.isAuthenticated = false;
    feathers
      .authenticate({
        strategy: 'local',
        email: payload.username,
        password: payload.password,
      })
      .then(({ accessToken, user }) => {
        dispatch({ type: UPDATE, payload: { token: accessToken, user } });
        setCookie('token', accessToken);
        feathers.isAuthenticated = true;
        Router.push(redirectUri || '/');
        resolve();
      })
      .catch((err) => {
        reject(err.message);
        dispatch(snackbar.error(err.message));
      });
  });
};

export const signout = () => (dispatch) => {
  return feathers
    .logout()
    .then(() => {
      dispatch({
        type: UPDATE,
        payload: { token: null, user: null },
      });

      removeCookie('token');

      // set feathers.authenticated flag FALSE
      feathers.authenticated = false;
    })
    .catch((err) => {
      dispatch(snackbar.error(err.message));
    });
};

export const register = (payload) => (dispatch) => {
  feathers
    .service('users')
    .create({
      email: payload.username,
      password: payload.password,
    })
    .then(() => {
      dispatch(signin(payload));
    })
    .catch((err) => {
      dispatch(snackbar.error(err.message));
    });
};

export const verify = (accessToken) => (dispatch) => {
  feathers.isAuthenticated = false;
  return feathers
    .authenticate({
      strategy: 'jwt',
      accessToken,
    })
    .then(({ accessToken, user }) => {
      // Update state with token load from server cookie
      dispatch({ type: UPDATE, payload: { token: accessToken, user } });
      feathers.isAuthenticated = true;
      return true;
    })
    .catch((err) => {
      // JWT invalid or expired
      dispatch(snackbar.error(err.message));
      dispatch({ type: UPDATE, payload: { token: null, user: null } });
      return false;
    });
};
