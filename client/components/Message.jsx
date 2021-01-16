import React from 'react';
import styled from 'styled-components';


const Message = (props) => {

  return (
    <Container>
      <Author>
        <Username  user={props.user}>username</Username>
        <Time_Sent>12:00PM</Time_Sent>
      </Author>
      <Post>
        This is a test message what do I look like on the big screen boss? Am I rendering correctly? Oh cool looks Like I am. I exist to serve you sir. Anyhting else I can help out with today?
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

  &:hover {
    background-color: #f5f0f0;
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