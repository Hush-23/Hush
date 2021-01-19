import React from 'react';
import styled from 'styled-components';

/**
 * Renders current user details for sidebar
 * avatar & username
 */

const UserDetails = ({ email }) => {
  return (
    <Container>
      <Avatar />
      <User>{email}</User>
    </Container>
  );
};

export default UserDetails;

/**
 * Styled Components
 */

const Container = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Avatar = styled.div`
  height: 3rem;
  width: 3rem;
  border-radius: 100%;
  background-color: #f2f0f0;
  margin-left: 1rem;
`;

const User = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  height: fit-content;
  margin-left: .5rem;
  font-size: 1rem;
  width: fit-content;
  color: #e91e63;
`;

