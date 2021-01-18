import * as types from '../constants/actionTypes';

const initialState = {
  // define initial state
  userList: [],
  username: '',
  loggedIn: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case types.LOGIN: {    
    return {
      ...state,
      loggedIn: true
    };
  }

  case types.SIGNUP: {
    return {
      ...state,
      loggedIn: true
    };
  }

  case types.GET_USERS: {
    // fetch '/user/getusers' response should look similar to userServerResponse
    console.log(action.payload);
    const userServerResponse = { users: [{name: 'Waye', email: 'weimpromptu@gmail.com'}, {name: 'Ian', email: 'ian.michael.garrett@gmail.com'}, {name: 'Matt', email: 'mattagreenberg1@gmail.com'}, {name: 'Ross', email: 'rrsarcona@gmail.com'}] };
    const userList = userServerResponse.users;
    return {
      ...state,
      userList,
    };
  }

  case types.INITIATE_CONVERSATION: {
    // send curUserEmail & action.payload (recipientEmail) to server route '/chat'
    const convServerResponse = {convId: '1', messages: []};
    const userList = [...state.userList];
    console.log(action, userList);
    return {
      ...state,
      userList,
    };
  }
  default:
    return state;
  }
};

export default userReducer;