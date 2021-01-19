import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SearchBar = ({ open, handleClick, activeConversations, setActiveChat, setActiveConversations, email }) => {

  // variable where all users in Results component will be held
  let users;

  /**
   * Set state
   * searchTerm holds state for current value in search input field
   * searchResults holds an array of user emails from getUsers server request
   *  open holds state that determines wether or not results component should be displayed - passed as prop into Results styled-component
   */
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  // request chat log info for selected user
  const handleClickUser = (e) => {
    if (activeConversations.includes(e.target.innerText)) return;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // chat log request requires logged-in user email & recipient email
        sender: email,
        recipient: e.target.innerText
      })
    };

    /**
     * immediately invoked Async function
     * makes request to server for conversation object using username
     */
    
    try {
      (async () => {
        const request = await fetch('/chat/convo', requestOptions);
        const response = await request.json();

        // setActiveConversations updates list of active conversations with user selected from search box
        setActiveConversations([...activeConversations, e.target.innerText]);

        // setActiveChat action updates state with currently selected user chat log
        setActiveChat({ response: response, recipient: e.target.innerText });
      })();
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * invoked on update to searchTerm state
   * gets current users from db and renders results based on input
   * Can this be improved by handling request once elsewhere?
   */

  useEffect(() => {
    // Define fetch request options
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email })
    };

    /**
     * immediately invoked Async function
     * makes request to server for all users in db
     * renders user emails in Results component based on input in search field
     */

    try {
      (async () => {
        const request = await fetch('/user/getUsers', requestOptions);
        const response = await request.json();
        users = await response.users;
        // filter out users that appear in activeConversations
        console.log('users', users);
        console.log('activeConversations', activeConversations);
        users = users.filter((user) => {
          if (!activeConversations.includes(user)) {
            return user;
          }
        });
        const results = users.filter(user => user.toLowerCase().includes(searchTerm));
        setSearchResults(results);
      })();
    } catch (err) {
      console.log(err);
    }
  }, [searchTerm]);

  return (
    <Container onClick={(e) => handleClick(e)}>
      <Input
        id='input'
        type='text'
        placeholder='Search users...'
        value={searchTerm}
        onChange={handleChange}
        onClick={(e) => handleClick(e)}
      />
      <Results open={open} >
        <ul>
          {searchResults.map((item, i) => (
            <User
              key={`${item}${i}`}
              email={item}
              onClick={(e) => handleClickUser(e)}
            >
              {item}
            </User>
          ))}
        </ul>
      </Results>
    </Container>
  );
};


export default SearchBar;

/**
 * Styled Components
 */

const Container = styled.div`
    height: 15%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
 `;

const Input = styled.input`
  width: 70%;
  height: 2rem;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #616161;
  text-indent: .5rem;
  margin-left: 1rem;
  flex-shrink: 0;
`;

const Results = styled.div`
  postition: absolute;
  top: 0;
  left: 0;
  height: fit-content;  
  width: 70%;
  overflow-y: scroll;
  border: 1px solid #616161;
  border-radius: 5px;
  border-top: none;
  display: ${props => props.open ? 'block' : 'none'};
  scrollbar-width: none;
  z-index: 5;
  margin-left: 1rem;
  background-color: white;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  
`;

const User = styled.li`
  list-style-type: none;
  padding-left: .5rem;
  text-align: bottom;
  font-family: 'Josefin Sans', sans-serif;
    height: 1.5rem;
    &:hover {
      background-color: #ffd9e5;
      
      cursor: pointer;
    }
`;