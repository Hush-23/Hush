import React from 'react';
import styled from 'styled-components';

/**
 * Redners each individual message component 
 * requires Author, timestamp, & message
 * 
 * Still need to make responsive & create logic to represent time
 */
const Message = ({  color, sender, timeStamp, message }) => {
  const dateOptions = {weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'};
  const formattedDate = new Date(timeStamp).toLocaleDateString('en-US', dateOptions);
  return (
    <Container>
      <Author>
        <Username  color={color}>{sender}</Username>
        <Time_Sent>{formattedDate}</Time_Sent>
      </Author>
      <Post>
        {message}
      </Post>
    </Container>
  );
};

export default Message;

/**
 * Styled Components
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 70%;
  margin-top: 1.2rem;
  overflow-wrap: break-word;
  &:hover {
    background-color: #fcf7fa;
  }
`;

const Author = styled.div`
  display: flex;
  width: fit-content;
  align-items: baseline;
  font-family: 'Josefin Sans', sans-serif;
`;

const Username = styled.p`
  font-size: 1.1rem;
  color: ${props => props.color};
`;

const Time_Sent = styled.p`
  margin-left: .5rem;
  font-size: .6rem;
  color: #616161
`;

const Post = styled.p`
  margin-top: .3rem;
  margin-left: 1.5rem;
  font-size: .9rem;
  font-family: 'Josefin Sans', sans-serif;
`;