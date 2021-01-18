import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import MessagesDisplay from '../components/MessagesDisplay.jsx';
import { sendMessage, deleteMessage } from '../actions/actions';

/**
 * Maps dispatch to props & connects with MessagesDisplay component 
 */

const mapDispatchToProps = dispatch => ({
  sendMessage: (message, timestamp) => {
    dispatch(sendMessage({ message, timestamp }));
  },
  deleteMessage: (message, author, timestamp) => {
    dispatch(deleteMessage({ message, timestamp }));
  }
});

export const Message_Container = connect(() => ({}), mapDispatchToProps)(MessagesDisplay);