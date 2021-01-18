import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/**
 * Renders active conversations to sidepanel
 */

const Conversations = ({ setActiveChat, activeConversations, email }) => {

  /**
   * Set state
   * directOpen determines whether to expand or hide active direct messages - passed as prop to styled component and changes display based on value
   * groupOpen  determines whether to expand or hide active group messages - passed as prop to styled component and changes display based on value
   */
  const [directOpen, setDirectOpen] = useState(true);
  const [groupOpen, setGroupOpen] = useState(true);



  // Make request for all active conversations, set default
  // pass active email to messages component
  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:  'ian.michael.garrett@gmail.com'})
      };

      try {
        const request = await fetch('/chat/userconvos', requestOptions);
        // const status = await request.status;
        const response = await request.json();
        console.log('conversations response', response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // handles click of direct caret
  const handleDirectClick = (e) => {
    if (directOpen) setDirectOpen(false);
    else setDirectOpen(true);
  };

  // handles click of group caret
  const handleGroupClick = (e) => {
    if (groupOpen) setGroupOpen(false);
    else setGroupOpen(true);
  };

  const handleUserClick = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // "sender" is taken from user state
        sender: 'ian@ian.com',
        // recipient taken from activeConversations email property === e.target.email
        recipient: 'asdfsdfsdf'
      })
    };

    /**
     * immediately invoked Async function
     * makes request to server for conversation object using username
     */

    try {
      (async () => {
        const request = await fetch('/chat/convo', requestOptions);
        const response = await request.json();
        setActiveChat(response);
      })();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Container>
      <Header>Conversations</Header>
      <Ul>
        <li><DirectCaret onClick={(e) => handleDirectClick(e)} open={directOpen} >Direct</DirectCaret>
          <InnerList open={directOpen} >
            <Direct email="from activeConversations email property" onClick={(e) => handleUserClick(e)}>Wei</Direct>
            <Direct>Ian</Direct>
          </InnerList>
        </li>
        <li><GroupCaret onClick={(e) => handleGroupClick(e)} open={groupOpen} >Groups</GroupCaret></li>
        <InnerList open={groupOpen} >
          <Group>Ian, Ross & Wei</Group>
        </InnerList>
      </Ul>
    </Container>
  );
};

export default Conversations;

/**
 * Styled Components
 */
const Container = styled.div`
  height: 65%;
  margin-top: -4rem;
  z-index: 2;
  font-family: 'Josefin Sans', sans-serif;
  overflow: hidden;
`;
const Ul = styled.ul`
  height: fit-content;
  list-style-type: none;
  margin-left: 2rem;
`;

const DirectCaret = styled.span`
  z-index: 0;
  cursor: pointer;
  user-select: none;

  &:before {
    font-family: times-new-roman;
    content: "\\005E";
    color: black;
    display: inline-block;
    padding: .5rem;
    transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(90deg)'}; 
  };
`;

const GroupCaret = styled(DirectCaret)`
  &:before {
    transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(90deg)'};
  }
`;

const Direct = styled.li`
  text-indent: 1rem;
  padding: .5rem;
  margin-left: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #fcf7fa;
    
  }
`;

const InnerList = styled.ul`
  list-style-type: none;
  display: ${props => props.open ? 'initial' : 'none'};
`;

const Group = styled(Direct)`

`;

const Header = styled.h3`
  height: fit-content;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 400;
`;