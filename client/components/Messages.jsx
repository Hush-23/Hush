import React from 'react';
import styled from 'styled-components';
import Message from './Message.jsx';

const Messages = (props) => {
  /**
   * GET all messages from db here
   * create array of Message components passing in details form each message in response
   */

  return (
    <Container>
      <Message user='#e91e63' />
      <Message user='#9c27b0' />
      <Message user='#e91e63' />
      <Message user='#2196f3' />
      <Message user='#e91e63' />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </Container>
  );
};

export default Messages;

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  height: 80%;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
`;