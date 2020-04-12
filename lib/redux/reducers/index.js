// redux/reducers/index.js
import { combineReducers } from 'redux';

import fooReducer from './fooReducer';

const rootReducer = combineReducers({
  foo: fooReducer,
});

export default rootReducer;
