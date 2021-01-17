import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SearchBar = (props) => {

  const people = [
    'Wei',
    'Matt',
    'Ross', 
    'Ian'
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [results, setResults] = useState(false);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleClick = event => {
    setResults(true);
  };


  useEffect(() => {
    const results = people.filter(person =>  person.toLowerCase().includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <Container>
      <Input 
        type='text' 
        placeholder='Search users'
        value={searchTerm}
        onChange={handleChange}
        onClick={handleClick}
      />
      <Results results={results} >
        <ul>
          {searchResults.map(item => (
            <User>{item}</User>
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
    align-items: center;
 `;

const Input = styled.input`
  width: 70%;
  height: 2rem;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #616161;
  text-indent: 1rem;
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
  display: ${props => props.results ? 'block' : 'none'};
  scrollbar-width: none;
  z-index: 5;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  background-color: white;
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