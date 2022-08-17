import { useState, useEffect } from 'react';

import {Stack, Pagination, Drawer, IconButton, TextField, Button, Container } from '@mui/material';
import { Close } from '@mui/icons-material';

import '../styles/Search.css'

import SearchResultsList from './SearchResultsList'

const keys = Object.keys(localStorage).filter(item => item.includes('_movieID'))

const Search = ({loading, baseUrl, searchOpen, closeSearch}) => {

  const [movies, setMovies] = useState([])
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [maxPages, setMaxPages] = useState(0)
  
  const searchMovies = async () => {

    if (!searchText.length) {
      return 
    }
   
    const res = await (await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=${page}&include_adult=false&query=${searchText}`)).json()
    setMovies(res?.results.map((item) => {
      const isFavorite = keys.length ? keys.includes(`${item.id}_movieID`) : false
        return {
            ...item,
            isFavorite
        }
    }))
  setMaxPages(res?.total_pages)
  console.log(res)
  }
  
  useEffect(() => {
    searchMovies()
  },[page])

  const handleInputChange = (event) => {
    const {value} = event.target
    setSearchText(value)
  }

  const setFavorite = (id) => {
    const moviesUpdated = movies.map((item) => {
        if (item.id !== id) {
            return {...item}
        } else {
            return {...item, isFavorite: !item.isFavorite}
        }
    })
    setMovies(moviesUpdated)
  }

  const closeSearchResult = () => {
    setMovies([])
    setSearchText('')
    setMaxPages(0)
  }

  return (
    <Drawer
      anchor='top'
      open={searchOpen}
      onClose={closeSearch}
    >
      <Container className='search-wrapper'>
          <div style={{display: 'flex', padding: '1rem'}} >
            <TextField  
              variant="standard"
              label='Search for a movie...'
              onChange={handleInputChange} 
              value={searchText} 
              color='secondary'
              className='textfild'
            />
            <IconButton 
              onClick={closeSearchResult}
              style={searchText === '' ? {display: 'none'} : {display: 'block'}}  
              size='large'
            >
              <Close/>
            </IconButton>
            <Button variant="outlined" color='secondary'  onClick={searchMovies} >search</Button>
          </div>
          <SearchResultsList
            movies={movies}
            searchText={searchText}
            loading={loading}
            baseUrl={baseUrl}
            setFavorite={setFavorite}
            
          />
          <Stack spacing={2}>
            {(!!searchText && !!maxPages) && (
              <Pagination 
                color="secondary"
                count={maxPages}
                disabled={loading}
                onChange={((_, num) => setPage(num))}
                sx={{marginX: 'auto'}}
              />
            )}
          </Stack>
      </Container>
    </Drawer>
  )
}

export default Search

// Сделать пагинацию при фильтрации