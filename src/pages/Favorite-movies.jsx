import { useState, useEffect } from 'react';
import MoviesList from '../component/MoviesList';

const FavoriteMovies = () => {
    const [movies,setMovies] = useState([])
    const [moviesId, setMoviesId] = useState([])

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

    const removeFormFavorite = (id) => {
        const moviesUpdated = movies.filter(item => item.id !== id)
        setMovies(moviesUpdated)
    }

    return (
        <MoviesList
        baseUrl={baseUrl}
        movies={movies}
        loading={false}
        setFavorite={removeFormFavorite}
        />
    )
}

export default FavoriteMovies
