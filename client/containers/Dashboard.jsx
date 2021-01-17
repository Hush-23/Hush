import React from 'react';
import styled from 'styled-components';
import { SidePanelContainer } from './sidePanelContainer.jsx';
import { Message_Container } from './Message_Container.jsx';
import Sidepanel from '../components/Sidepanel.jsx';

const Dashboard = (props) => {
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