/**
 * @description Action Creators
 * 
 */


// import all actionTypes as types

import * as types from '../constants/actionTypes';


export const initiateConversation = (recipientEmail) => ({
  type: types.INITIATE_CONVERSATION,
  payload: recipientEmail
});

export const login = (userID) => ({
  type: types.LOGIN,
  payload: userID,
});

export const signup = (userID) => ({
  type: types.SIGNUP,
  payload: userID,
});

export const setActiveChat = (messages) => ({
  type: types.SET_ACTIVE_CHAT,
  payload: messages,
});

export const setActiveConversations = (activeConversationPayload) => ({
  type: types.SET_ACTIVE_CONVERSATIONS,
  payload: activeConversationPayload
});

export const setClientSocket = (socketPayload) => ({
  type: types.SET_CLIENT_SOCKET,
  payload: socketPayload
});

export const addNewMessage = (messagePayload) => ({
  type: types.ADD_NEW_MESSAGE,
  payload: messagePayload
});

export const logout = () => ({
  type: types.LOGOUT
});