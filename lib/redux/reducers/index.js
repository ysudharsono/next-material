import { combineReducers } from 'redux';

import authReducer from './authR';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
