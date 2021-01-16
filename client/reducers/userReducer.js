import * as types from '../constants/actionTypes';

const initialState = {
  // define initial state
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.LOGIN: {
    return {
      ...initialState,
    };
  }

  case types.SIGNUP: {
    return {
      ...initialState,
    };
  }

  default:
    return state;
  }
};

export default userReducer;