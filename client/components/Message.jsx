import React from 'react';
import styled from 'styled-components';

/**
 * Redners each individual message component 
 * requires Author, timestamp, & message
 * 
 * Still need to make responsive & create logic to represent time
 */
const Message = (props) => {

  return (
    <Container>
      <Author>
        <Username  user={props.user}>{props.sender}</Username>
        <Time_Sent>{props.timeStamp}</Time_Sent>
      </Author>
      <Post>
        {props.message}
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
  color: ${props => props.user};
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