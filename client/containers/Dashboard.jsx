import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SidePanelContainer } from './sidePanelContainer.jsx';
import { Message_Container } from './Message_Container.jsx';

/**
 * 
 * Main page for authenticated user
 * Renders Sidepanel_Container & Message_Container Components
 * How can we redirect to login on unsuccessfull verification?
 */

const Dashboard = (props) => {

  // useEffect((state) => {
  //   if (!state.loggedIn) history.push('/login');
  // });

  return (
    <Container>
      {/* <SidePanelContainer /> */}
      <SidePanelContainer />
      <Message_Container />
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