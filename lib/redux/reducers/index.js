import { combineReducers } from 'redux';

import authReducer from './authR';
import fooReducer from './fooR';

const rootReducer = combineReducers({
  auth: authReducer,
  foo: fooReducer,
});

export default rootReducer;
