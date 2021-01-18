import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SendMessage = (props) => {
  let input;

  return (
    <Container>
      <Post>
        <Form onSubmit={(e) => {
          e.preventDefault();
          props.dispatch(input.value, new Date().getTime());
          input.value= '';
        }}>
          <Input type='text' placeholder='Send a message to Username...' ref={(node) => input = node} />
          <Send_Btn onClick={(e) => {
            
            props.dispatch(input.value, new Date().getTime());
            input.value= '';
          }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24">
              <path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/>
            </svg>
          </Send_Btn>
        </Form>
      </Post>
    </Container>
  );
};

SendMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default SendMessage;

/**
 * Styled Components
 */

const Container = styled.div`
  margin-top: 1.3rem;
  display: flex;
  width: 100%;
  height: 15%;
  justify-content: center;
  align-items: center;
`;

const Post = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  border: 1px solid #616161;
  border-radius: 5px;
  background-color: #f7f7f7;
  height: 70%;
  margin-left: 1rem;
  box-shadow: 1px 1px 1px lightgrey;
`;

const Form = styled.form`
  display: flex;
  height: 50%;
  width: 90%;
  
`;

const Send_Btn = styled.div`
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  border: none;
  background-color: #f7f7f7;
  
  &:focus {
    outline: none;
  }
`;