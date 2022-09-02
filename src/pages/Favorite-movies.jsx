import { useState, useEffect } from 'react';
import MoviesList from '../component/MoviesList';
import FilteredGenres from '../component/FilteredGenres';

import { Button } from '@mui/material';

import '../styles/FavoriteMovies.css'

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
            if (!item?.genre_ids) {
                return false
            }
            const isIncludes = item.genre_ids.filter(id => genres.includes(id))
            if (isIncludes.length) {
                return item
            }
        })
        setFilteredMovies(filterMovies)
    }

    const removeFormFavorite = (id) => {
        console.log('removeFormFavorite', id)

        const moviesUpdated = movies.filter(item => item.id !== id)
        setMovies(moviesUpdated)
        console.log(moviesUpdated)
    }


    return (
        <>  
            <div className="genres-wrapper">
                <FilteredGenres
                    addGenre={addGenre}
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

// доделать фильтр для лучшей работы(что бы если нет подходящего фильма то показывало ворнинг какой-то)
