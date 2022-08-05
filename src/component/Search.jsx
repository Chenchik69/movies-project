import { useState, useEffect } from 'react';

import {Stack, Pagination, Drawer, IconButton, TextField, Button, Container } from '@mui/material';
import {FilterAlt, Close} from '@mui/icons-material';

import '../styles/Search.css'

import SearchResultsList from './SearchResultsList'
import FilteredGenres from './FilteredGenres';

const keys = Object.keys(localStorage).filter(item => item.includes('_movieID'))

const Search = ({loading, baseUrl, searchOpen, closeSearch}) => {

  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [maxPages, setMaxPages] = useState(0)
  const [showGenres, setShowGenres] = useState(false)
  
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
  }
  
  useEffect(() => {
    searchMovies()
  },[page, filteredMovies])

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

  const addGenre = (id) => {
    if (genres.length && genres.includes(id)) {
      setGenres(prevState => prevState.filter(item => id !== item))
    } else {
      setGenres(prevState => [...prevState, id])
    }
  }

  useEffect(() => {
    if (!genres.length) {
      setFilteredMovies([])
    }
  },[genres])

  const filterMovie = () => {
    if (!genres.length) {
      return
    }
    const filterMovies = movies.filter((item) => {
      const isIncludes = item.genre_ids.filter(id => genres.includes(id))
      if (isIncludes.length) {
        return item
      }
    })
    setFilteredMovies(filterMovies)
  }
  
  const renderGenres = () => {
    setShowGenres(!showGenres)
  }

  const closeSearchResult = () => {
    setMovies([])
    setSearchText('')
    setMaxPages(0)
    setGenres([])
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
            <Button variant="outlined" color='secondary'  onClick={filterMovie} className='textfild-button'>Filter</Button>
            <Button variant="outlined" color='secondary'  onClick={searchMovies} >search</Button>
          </div>
          <IconButton onClick={renderGenres}>
              <FilterAlt/>
          </IconButton>
          <div className="genres-wrapper" style={showGenres === false ? {display: 'none'} : {display: 'block'}} >
            <FilteredGenres
              addGenre={addGenre}
              filterMovie={filterMovie}
              />
          </div>
          <SearchResultsList
            movies={filteredMovies.length ? filteredMovies : movies}
            genres={genres}
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