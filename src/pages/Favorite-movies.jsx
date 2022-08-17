import { useState, useEffect } from 'react';
import MoviesList from '../component/MoviesList';
import FilteredGenres from '../component/FilteredGenres';

import { Button } from '@mui/material';

const FavoriteMovies = () => {
    const [movies,setMovies] = useState([])
    const [moviesId, setMoviesId] = useState([])
    const [genres, setGenres] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])

    const keys = Object.keys(localStorage).filter(item => item.includes('_movieID'))
    const baseUrl = localStorage.getItem('secure_base_url') || 'https://image.tmdb.org/t/p/'
    const data = Object.entries(localStorage)
    
    const moviesArray = data.map(item => {
        if (item[0].includes('_movieID')) {
            return JSON.parse(item[1])
        } else {
            return null
        }
    }).filter(Boolean)

    useEffect(() => {
        setMovies(moviesArray)
    },[])

    useEffect(() => {
        setMoviesId(keys)
    },[])

    useEffect(() => {
        if (!genres.length) {
          setFilteredMovies([])
        }
      },[genres])

    const removeFormFavorite = (id) => {
        const moviesUpdated = movies.filter(item => item.id !== id)
        setMovies(moviesUpdated)
    }

    const addGenre = (id) => {
        if (genres.length && genres.includes(id)) {
          setGenres(prevState => prevState.filter(item => id !== item))
        } else {
          setGenres(prevState => [...prevState, id])
        }
      }

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

    return (
        <>  
            <div className="genres-wrapper">
                <FilteredGenres
                    addGenre={addGenre}
                    filterMovie={filterMovie}
                />
            </div>
            <Button variant="outlined" color='secondary'  onClick={filterMovie} className='textfild-button' fullWidth>Filter</Button>
            <MoviesList
                baseUrl={baseUrl}
                movies={filteredMovies.length ? filteredMovies : movies}
                loading={false}
                setFavorite={removeFormFavorite}
            />
        </>
    )
}

export default FavoriteMovies
