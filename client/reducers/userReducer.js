import * as types from '../constants/actionTypes';

const initialState = {
  // define initial state
  userList: [],
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

  case types.GET_USERS: {
    // fetch '/user/getusers' response should look similar to userServerResponse
    console.log(action.payload);
    const userServerResponse = { users: [{name: 'Waye', email: 'weimpromptu@gmail.com'}, {name: 'Ian', email: 'ian.michael.garrett@gmail.com'}, {name: 'Matt', email: 'mattagreenberg1@gmail.com'}, {name: 'Ross', email: 'rrsarcona@gmail.com'}] };
    const userList = userServerResponse.users;
    return {
      ...initialState,
      userList,
    };
  }

  case types.INITIATE_CONVERSATION: {
    // send curUserEmail & action.payload (recipientEmail) to server route '/chat'
    const convServerResponse = {convId: '1', messages: []};
    const userList = [...state.userList];
    console.log(action, userList);
    return {
      ...initialState,
      userList,
    };
  }
  default:
    return state;
  }
};

export default userReducer;