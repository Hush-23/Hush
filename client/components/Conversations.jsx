import React, { useState } from 'react';
import styled from 'styled-components';

const Conversations = (props) => {

  const [directOpen, setDirectOpen] = useState(true);
  const [groupOpen, setGroupOpen] = useState(true);

  const handleDirectClick = (e) => {
    if (directOpen) setDirectOpen(false);
    else setDirectOpen(true);
  };

  const handleGroupClick = (e) => {
    if (groupOpen) setGroupOpen(false);
    else setGroupOpen(true);
  };


  return (
    <Container>
      <Header>Conversations</Header>
      <Ul>
        <li><DirectCaret onClick={(e) => handleDirectClick(e)} open={directOpen} >Direct</DirectCaret>
          <InnerList open={directOpen} >
            <Direct>Wei</Direct>
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
  margin-top: -2rem;
  z-index: 2;
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