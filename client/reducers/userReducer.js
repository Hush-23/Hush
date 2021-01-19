import * as types from '../constants/actionTypes';

const initialState = {
  // define initial state
  userList: [],
  username: '',
  loggedIn: false,
  email: '',
  activeRecipient: '',
  activeChat: {cid: '', conversation: []},
  activeConversations: [],
  activesLoaded: false,
  clientSocket: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  
  // change user state loggedIn to true
  case types.LOGIN: {  
    return {
      ...state,
      loggedIn: true,
      email: action.payload
    };
  }

  // change user state loggedIn to true
  case types.SIGNUP: {
    return {
      ...state,
      loggedIn: true,
      email: action.payload
    };
  }

  case types.LOGOUT: {
      return {
        ...state,
        loggedIn: false
      }
  }

  // updates user list in state
  case types.INITIATE_CONVERSATION: {
    const convServerResponse = {convId: '1', messages: []};
    const userList = [...state.userList];
    return {
      ...state,
      userList,
    };
  }

  // set the active chat messages and active recipient in state
  case types.SET_ACTIVE_CHAT: {
  
    // action payload is an object of {cID, [users], [messages]}

    const activeChat = action.payload.response;
    const activeRecipient = action.payload.recipient;
    console.log(activeRecipient);
    return {
      ...state,
      activeChat,
      activeRecipient
    };
  }

  // adds new conversation to active conversations
  case types.SET_ACTIVE_CONVERSATIONS: {
    return {
      ...state,
      activeConversations: action.payload
    };
  }

  // Stores the current users socket in state
  case types.SET_CLIENT_SOCKET: {
    // console.log('clientsocket payload', action.payload);
    return {
      ...state,
      clientSocket: action.payload
    };
  }

  // Add new message on client side
  case types.ADD_NEW_MESSAGE: {
    console.log(state.activeChat);
    const conversation = [...state.activeChat.conversation]
    conversation.push(action.payload);
    const cidCopy = state.activeChat.cid;
    return {
      ...state,
      activeChat: {
        cid: cidCopy,
        'conversation': conversation
      }
    };
  }

  default:
    return state;
  }
};

export default userReducer;