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

const Dashboard = ({ activesLoaded, setActivesLoaded, setActiveConversations, activeConversations, setActiveChat, activeChat, loggedIn, history, email }) => {
  // console.log('loggedin', loggedIn);
  // // if user is not logged in, redirect to login page
  // useEffect(() => {
  //   console.log(loggedIn);
  //   if (!loggedIn) history.push('/login');
  // });

  return (
    <Container>
      {/* <SidePanelContainer /> */}
      <SidePanelContainer email={email} activesLoaded={activesLoaded} setActivesLoaded={setActivesLoaded} setActiveConversations={setActiveConversations} activeConversations={activeConversations} setActiveChat={setActiveChat} activeChat={activeChat} />
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