import React, { useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message.jsx';
import CryptoJS from 'crypto-js';




/**
 * Renders all individual Message components
 */
const Messages = ({ activeChat, email }) => {

  // Define colors for sender username
  const colors = {
    user1: '#e91e63',
    user2: '#2196f3',
  }

  /**
   * GET all messages from db here
   * create array of Message components passing in details form each message in response
   */

  const chat = [];
  const { conversation } = activeChat;
  // build Message component array
  if (conversation.length > 0) {
    conversation.reverse();
    conversation.sort((a, b) => a.timestamp < b.timestamp ? 1 : 0);
    for (let i = 0; i < conversation.length; i += 1) {
      // decrypt message text
      const secret = 'tacos';
      let bytes = CryptoJS.AES.decrypt(conversation[i].text, secret);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);

      let color;
      if (conversation[i].sender === email) color = colors.user1;
      else color = colors.user2;

      chat.push(
        <Message
          key={i}
          sender={conversation[i].sender}
          message={originalText}
          timeStamp={conversation[i].timestamp}
          color={color}
        />
      );
    }
  }

  // re-build Message component array on state update
  useEffect(() => {
    const { conversation } = activeChat;

    if (conversation.length > 0) {
      conversation.reverse();
      for (let i = 0; i < conversation.length; i += 1) {
        const secret = 'tacos';
        let bytes = CryptoJS.AES.decrypt(conversation[i].text, secret);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);

        chat.push(
          <Message
            key={i}
            sender={conversation[i].sender}
            message={originalText}
            timeStamp={conversation[i].timestamp}
          />
        );
      }
    }
  }, [activeChat])

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