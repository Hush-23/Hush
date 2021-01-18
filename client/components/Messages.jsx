import React from 'react';
import styled from 'styled-components';
import Message from './Message.jsx';


/**
 * Renders all individual Message components
 */
const Messages = ({ activeChat }) => {
  /**
   * GET all messages from db here
   * create array of Message components passing in details form each message in response
   */
  // currently send is email, need to map emails to usernames
  // could store send name as variable to push as component prop 
  const { conversation } = activeChat;
  const chat = [];
  if (conversation.length > 0) {
    for (let i = 0; i < conversation.length; i += 1) {
      chat.push(<Message key={i} sender={conversation[i].sender} message={conversation[i].text} timeStamp={conversation[i].timestamp} />);
    }
  }

  return (
    <Container>
      {chat}
    </Container>
  );
};

export default Messages;

/**
 * Styled Components
 */

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