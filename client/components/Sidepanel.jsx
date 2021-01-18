import React, { useState } from 'react';
import styled from 'styled-components';
import Conversations from './Conversations.jsx';
import SearchBar from './SearchBar.jsx';
import UserDetails from './UserDetails.jsx';

/**
 * Renders Sidepanel, including current user details, user search bar, & active conversations
 */
const Sidepanel = (props) => {

  /**
   * Set state
   *  open holds state that determines wether or not results component should be displayed
   *  passed as prop into serachBar then into Results styled-component
   */
  const [open, setOpen] = useState(false);

  // set  open to true on click of input field - set open to false on click of container
  // passed as prop to searchBar and to handle initial click into search bar
  const handleClick = event => {
    if (open) setOpen(false);
    else if (event.target.id === 'input') setOpen(true);
  };

  return (
    <Container onClick={handleClick}>
      <UserDetails />
      <SearchBar open={open} handleClick={handleClick} />
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
  background-color: #fcfcfc;
`;