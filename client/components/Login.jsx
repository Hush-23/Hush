import React, { useState } from 'react';
import styled from 'styled-components';
import Signup from './Signup.jsx';
import socketIOClient from 'socket.io-client';

/**
 * 
 * @description Renders in App component, if endpoint is /
 * Page including login container & signup container
 * handles all requests to server and responds accordingly
 * reroutes to dashboard component on authentication of user
 */

const Login = ({ login, signup, history, setClientSocket, addNewMessage, activeRecipient }) => {

  /**
   * Socket handler functions
   * invoked below on successfull login
   */

  let clientSocket;

  // initial socket connection
  const connectToSocket = () => {
    clientSocket = io.connect();
    setClientSocket(clientSocket);
    clientSocket.emit('connected', 'INITIAL CONNECTION !!@!@!@!!!@!@!@!@!@');
  };

  // add user to 'phonebook' in websocket server
  const defineMe = (username) => {
    clientSocket.emit('defineClient', `{"username":"${username}" }`);
  };

  // listen for any requests to users websocket
  const listenForMessage = () => {
    clientSocket.on('outGoingDM', (incomingMessage) => {
      let incomingMessageObj = JSON.parse(incomingMessage);
      console.log('sender:', incomingMessageObj.sender, 'activeRecipient:', activeRecipient);
      // if (incomingMessageObj.sender === activeRecipient) addNewMessage(incomingMessageObj);
      //up to front end how they want to render that message ...
      addNewMessage(incomingMessageObj);
    })
  };


  /**
   * Set state 
   * errorMessage handles current response status message
   * openSignup determines whether signup container should be displayed
   * hideLogin determines whether login container should be displayed
   */

  const [errorMessage, setErrorMessage] = useState('');
  const [openSignup, setOpenSignup] = useState(false);
  const [hideLogin, setHideLogin] = useState(false);


  // handles click to open & close signup container/login container 
  // state values are passed into styled-component as prop and display is rendered based on value

  const handleSignup = (e) => {
    if (openSignup) {
      setOpenSignup(false);
      setHideLogin(false);
    } else {
      setHideLogin(true);
      setOpenSignup(true);
    }
  };


  // handle submission of login form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Define fetch request options
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email.value, password: password.value })
    };

    // Define response error messages
    const errorMessages = {
      '201': 'Email incorrect',
      '202': 'Password incorrect'
    };

    /**
     * immediately invoked Async function
     * Sends input values from form as body on post request to server
     * server verifies user information in db & returns status code
     * if successfull logs user in and reroutes to dashboard page
     * if fails displays error message on login form
     * 
     * 
     * makes initial connection to socket
     * adds user socket to 'phonebook' on websocket server
     * invokes function to listen for requests to the users socket
     */

    (async () => {
      try {
        console.log('email', email);
        const request = await fetch('/user/verify', requestOptions);
        const status = request.status;
        const response = await request.json();
        if (response.verified) {
          // Set state in redux store to logged in
          console.log(email.value);
          login(email.value);
          connectToSocket();
          defineMe(email.value);
          listenForMessage();
          history.push('/dashboard');
        } else {
          setErrorMessage(errorMessages[status.toString()]);
        }
        email.value = '';
        password.value = '';
      } catch (err) {
        console.log(err);
      }
    })();

  };

  // variables where input values are held
  let email;
  let password;

  return (
    <Screen>
      <Container hide={hideLogin}>
        <Hush>hush</Hush>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input type='text' placeholder='Email' ref={(node) => email = node} />
          <Input type='password' placeholder='Password' ref={(node) => password = node} />
          <LoginBtn type='submit' value='Log In' />
        </Form>
        <SignupMessage>Don&apos;t have an account? <SignupBtn onClick={handleSignup}>Sign up</SignupBtn></SignupMessage>
      </Container>

      <Signup open={openSignup} signup={signup} history={history} handleSignupClose={handleSignup} />
    </Screen>
  );
};

export default Login;



/**
 * Styled Components
 */

const Screen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: ${props => props.hide ? 'none' : 'flex'};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 17rem;
  width: 15rem;
  border: 1px solid #616161;
  box-shadow: 2px 2px 2px lightgrey;
`;

const Form = styled.form`
  height: 80%;
  width: 60%;
`;

const Input = styled.input`
  margin-top: .5rem;
  height: 2rem;
  text-indent: .5rem;
  border: 1px solid #616161;
  border-radius: 3px;
`;

const LoginBtn = styled(Input)`
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

const Hush = styled.h3`
  height: 20%;
  font-size: 3rem;
  font-weight: 400;
  text-align: center;
  margin-top: 2rem;
  color: #616161;
  font-family: 'Josefin Sans', sans-serif;
`;

const SignupMessage = styled.p`
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 300;
  color:  #616161;
  text-align: center;
  margin-top: .5rem;
  font-size: .7rem;
`;

const SignupBtn = styled.span`
  color: #ebabc4;

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
  margin-top: 1rem;
`;