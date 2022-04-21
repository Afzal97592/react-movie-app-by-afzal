import React, { useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import MovieComponent from './components/MovieComponent';
import MovieInfoComponent from './components/MovieInfoComponent';

export const API_KEY = '865772f';
  
const Container = styled.div `
display: flex;
flex-direction: column;
`;
const Header = styled.div`
display: flex;
flex-direction: row;
background-color: black;
color: white;
padding: 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
justify-content: space-between;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  width: 50%;
  margin-top: 9px;
  background-color: rgba(155,155,155,0.5);
  border-radius: 8px;
  margin-left: 100px;
  height : 40px;
  align-items: center;
  box-shadow: 0 2px 10px 1px white;

`;

const SearchIcon = styled.img`
   width: 32px;
   height: 32px;
   

`;
 
const SearchInput = styled.input`
  color: black;
  font-size: 20px;
  font-weight: 500;
  // border: none;
  display: flex;
  flex-direction: row;
  align-items:center;
  height: 40px;
  border-radius: 6px;
  background-color: whitesmoke;
  outline: none;
  margin-left: 10px;
  width: 100%;
  box-shadow: 2px 0 10px 0px white;
  letter-spacing : 2px;
  padding-left: 40px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
   padding: 30px;
    gap : 24px;
  justify-content: center;
  align-items: center;
`
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;


function App() {

  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return(
  
  <Container>
    <Header>
      <AppName>
         <MovieImage src = "/movie-icon.svg" />
    React Movie App
      </AppName>
  <SearchBox>
     
     <SearchInput  placeholder='Search Movies....' value={searchQuery} onChange={onTextChange} />
     <SearchIcon src = '/search-icon.svg' />
  </SearchBox>   
  </Header>
  {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}

  <MovieListContainer>
    {
      movieList?.length? ( movieList.map((movie, index)=> (<MovieComponent key = {index}  movie={movie} onMovieSelect={onMovieSelect} />))
      
     ) : (
      <Placeholder src="/movie-icon.svg" />
      )}
   
   
  </MovieListContainer>
  

  </Container>
  )
}

export default App;
