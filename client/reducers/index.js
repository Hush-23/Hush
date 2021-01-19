/**
 * @description Combines all reducers
 */

import { combineReducers } from 'redux';

// import all reducers
import userReducer from './userReducer';

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;
