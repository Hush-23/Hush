/**
 * @description Action Creators
 * 
 */


// import all actionTypes as types

import * as types from '../constants/actionTypes';


export const initiateConversation = (initiateConversationPayload) => ({
  type: types.INITIATE_CONVERSATION,
  payload: initiateConversationPayload
});

export const endConversation = (endConversationPayload) => ({
  type: types.END_CONVERSATION,
  payload: endConversationPayload
});

export const changeConversation = (changeConversationPayload) => ({
  type: types.CHANGE_CONVERSATION,
  payload: changeConversationPayload,
});

export const sendMessage = (sendMessagePayload) => ({
  type: types.SEND_MESSAGE,
  payload: sendMessagePayload,
});

export const deleteMessage = (deleteMessagePayload) => ({
  type: types.DELETE_MESSAGE,
  payload: deleteMessagePayload,
});

export const editMessage = (editMessagePayload) => ({
  type: types.EDIT_MESSAGE,
  payload: editMessagePayload,
});

export const likeMessage = (likeMessagePayload) => ({
  type: types.LIKE_MESSAGE,
  payload: likeMessagePayload,
});

export const login = (userID) => ({
  type: types.LOGIN,
  payload: userID,
});

export const signup = (userID) => ({
  type: types.SIGNUP,
  payloard: userID,
});