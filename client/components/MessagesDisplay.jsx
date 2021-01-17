import React from 'react';
import styled from 'styled-components';
import SendMessage from './SendMessage.jsx';
import Messages from './Messages.jsx';

const Message_Display = (props) => {
  return (
    <Container>
      <Messages />
      <SendMessage dispatch={props.sendMessage} />
    </Container>
  );
};

export default Message_Display;

/**
 * Styled Components
 */

const Container = styled.div`
  position: fixed;
  right: 20%;
  bottom: 1rem;
  height: 90%;
  width: 70%;
  
`;