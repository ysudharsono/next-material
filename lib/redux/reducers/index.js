import { combineReducers } from 'redux';

import authReducer from './authR';
import snackbarReducer from './snackbarR';

const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
