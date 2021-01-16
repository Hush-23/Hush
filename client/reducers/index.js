/**
 * @description Combines all reducers
 */

import { combineReducers } from 'redux';

// import all reducers
import messageReducer from './messageReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  user: userReducer,
  message: messageReducer
});

export default reducers;
