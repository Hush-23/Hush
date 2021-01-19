import React, { useState } from 'react';
import styled from 'styled-components';

const Signup = ({ signup, history, open, handleSignupClose }) => {

  /**
   * Set state 
   * errorMessage handles current response status message
   */

  const [errorMessage, setErrorMessage] = useState('');

  // handles submission of signup form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Define fetch request options
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email.value, password: password.value, name: username.value })
    };

    // Define response error messages
    const errorMessages = {
      '203': 'Email already in use'
    };

    /**
     * immediately invoked Async function
     * Sends input values from form as body on post request to server
     * server verifies email is not already active in db, adds user to db & returns status code
     * if successfull logs user in and reroutes to dashboard page
     * if fails displays error message on signup form
     */

    (async () => {
      try {
        const request = await fetch('/user/create', requestOptions);
        const status = await request.status;
        const response = await request.json();
        if (response.created) {
          // Set state in redux store to logged in
          signup(email.value);
          history.push('/dashboard');
        } else {
          setErrorMessage(errorMessages[status.toString()]);
        }
      } catch (err) {
        console.log(err);
      }
    })();
    email.value = '';
    username.value = '';
    password.value = '';
  };


  // variables where input values are held
  let email;
  let username;
  let password;


  return (
    <Container open={open}>
      <CloseBtn onClick={handleSignupClose} />
      <Header>Create an account</Header>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type='text'
          placeholder='Email'
          ref={(node) => email = node}
        />
        <Input
          type='text'
          placeholder='Username'
          ref={(node) => username = node}
        />
        <Input
          type='password'
          placeholder='Password'
          ref={(node) => password = node}
        />
        <SignupBtn
          type='submit'
          value='Sign Up'
        />
      </Form>
    </Container>
  );
};

export default Signup;

/**
 * Styled Components
 */

const Container = styled.div`
  display: ${props => props.open ? 'initial' : 'none'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 17rem;
  width: 15rem;
  border: 1px solid #616161;
  box-shadow: 2px 2px 2px lightgrey;
`;

const Form = styled.form`
  height: 80%;
  width: 60%;
  margin-left: 3rem;
`;

const Input = styled.input`
  margin-top: .5rem;
  height: 2rem;
  text-indent: .5rem;
  border: 1px solid #616161;
  border-radius: 3px;
`;

const SignupBtn = styled(Input)`
  border-radius: 5px;
  height: 1.5rem;
  border: none;
  background-color: #ebabc4;
  cursor: pointer;
  color: white;

  &:hover {
    box-shadow: 1px 1px 1px lightgrey;
    background-color: #e892b4;
  }
`;

const Header = styled.h3`
  font-size: 1rem;
  font-weight: 300;
  color: #616161;
  font-family: 'Josefin Sans', sans-serif;
  height: 10%;
  margin-left: 3rem;
  margin-top: 1rem;
`;

const CloseBtn = styled.div`
  display: flex;
  width: 97%;
  flex-direction: row-reverse;
  height: 1rem;
  margin-right: 1rem;
  margin-top: .1rem;
  &:after {
    content: '\\00D7';
  }

  &:hover {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  height: fit-content;
  width: 100%;
  color: red;
  font-family: 'Josefin Sans', sans-serif;
  font-size: .7rem;
  text-align: center;
  margin-top: .5rem;
`;