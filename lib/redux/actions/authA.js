import Router from 'next/router';
import { bindActionCreators } from 'redux';

import { removeCookie, setCookie } from '../../cookie';
import feathers from '../../feathers';

const prefix = 'AUTH';
export const UPDATE = `${prefix}-UPDATE`;

export const signin = (payload) => (dispatch) => {
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
      Router.push('/');
    })
    .catch((err) => {
      console.log('signin failed', err);
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
      console.log('signout failed', err);
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
      bindActionCreators(signin, dispatch)(payload);
    })
    .catch((err) => {
      console.log('register failed', err);
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
      console.log('token expired or invalid', err);
      dispatch({ type: UPDATE, payload: { token: null, user: null } });
      return false;
    });
};
