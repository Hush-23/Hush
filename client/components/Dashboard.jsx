import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SidePanelContainer } from '../containers/sidePanelContainer.jsx';
import { Message_Container } from '../containers/Message_Container.jsx';

/**
 * 
 * Main page for authenticated user
 * Renders Sidepanel_Container & Message_Container Components
 * How can we redirect to login on unsuccessfull verification?
 */

const Dashboard = ({ activesLoaded, setActivesLoaded, setActiveConversations, activeConversations, setActiveChat, activeChat, loggedIn, history, email, activeRecipient, logout, clientSocket }) => {

  // if user is not logged in, redirect to login page
  useEffect(() => {
    console.log(loggedIn);
    if (!loggedIn) history.push('/login');
  }, [loggedIn]);


  const handleLogout = (e) => {
    (() => { //pass in this.state.username
      console.log('disconnecting  From  Socket');
      clientSocket.emit('plzDisconnect', `${email}`);
      clientSocket.disconnect();
    })();
    logout();
  };

  return (
    <Container>

      <Recipient>{activeRecipient}</Recipient>
      <Logout_Btn onClick={(e) => handleLogout(e)} >Logout</Logout_Btn>
      <SidePanelContainer
        email={email}
        activesLoaded={activesLoaded}
        setActivesLoaded={setActivesLoaded}
        setActiveConversations={setActiveConversations}
        activeConversations={activeConversations}
        setActiveChat={setActiveChat}
        activeChat={activeChat}
      />
      <Message_Container activeConversations={activeConversations} />
    </Container>
  );
};

export default Dashboard;

/**
 * Styled Components
 */

const Container = styled.div`
  width: 100%;
  height: 100%;
 `;

const Recipient = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.5rem;
  position: fixed;
  top: 2rem;
  z-index: 2;
  left: 17rem;
  height: 3rem;
  width: fit-content;
 `;

const Logout_Btn = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 6rem;
  height: 2rem;
  border-radius: 5px;
  border: 1px solid #e91e63;
  color: #e91e63;
  font-family: 'Josefin Sans', sans-serif;
  text-align: center;
  margin-right: 1rem;
  background-color: white;

  &:hover {
    box-shadow: 2px 2px 2px #fcf7fa;
    cursor: pointer;
  }
`;