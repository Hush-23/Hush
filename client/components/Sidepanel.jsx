import React from 'react';
import styled from 'styled-components';
import Conversations from './Conversations.jsx';
import SearchBar from './SearchBar.jsx';
import UserDetails from './UserDetails.jsx';

const Sidepanel = (props) => {
  return (
    <Container>
      <UserDetails />
      <SearchBar />
      <Conversations />
    </Container>
  );
};

export default Sidepanel;

/**
 * Styled Components
 */

const Container = styled.div`
  border-right: 1px solid black;
  height: 100%;
  width: 15%;
  box-shadow: 1px 1px 1px darkgrey;
`;