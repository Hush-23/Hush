import React from 'react';
import styled from 'styled-components';
import UserDrop from '../components/userDrop.jsx';
import ConvList from '../components/convList.jsx';

const SidePanel = ({ userList, dispatch}) => {
  // console.log(dispatch);
  return (
    <Wrapper>
      <UserDrop
        userList = {userList}
        getUsers = {dispatch}
        initiateConversation = {dispatch}
      />
      <ConvList
        userList = {userList}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: lightblue;
  width: 20%;
  padding-left: 10px;
`;

export default SidePanel;

