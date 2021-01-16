import React, { useState } from 'react';
import styled from 'styled-components';

const UserDrop = ({ userList, getUsers, initiateConversation }) => {
  // console.log(getUsers);
  const users = [];
  const [hidden, setHidden] = useState('none');

  for (let i = 0; i < userList.length; i += 1) {
    if (userList[i] !== undefined) {
      users.push(<div key={i} onClick={(e) => console.log(e.target.attributes.value.value)} id='dropopt' value={userList[i].email}>{userList[i].name}</div>);
    }
  }
  function drop() {
    getUsers('test');
    // update hidden to false
    hidden === 'none' ? setHidden('initial'): setHidden('none');
  }
  
  window.onclick = function(e) {
    if ((!e.target.matches('.dropbtn') && !e.target.matches('#dropopt')) && hidden === 'initial') {
      setHidden('none');
    }
  };
  return (
    <div>
      <div className="dropdown">
        <button onClick={(e) => drop()} className="dropbtn">Dropdown</button>
        <Dropdown hidden={hidden} id="users" className="userlist">
          {users}
        </Dropdown>
      </div>
    </div>
  );
};

const Dropdown = styled.div`
  display: ${props => props.hidden};
  ${Dropdown}:hover & {
    background-color: black;
    cursor: pointer;
  }
`;

export default UserDrop;
