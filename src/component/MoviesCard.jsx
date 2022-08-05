import {IconButton} from '@mui/material';
import {FavoriteBorder, Favorite} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom';

import '../styles/MoviesCard.css'
import Image from '../images/no_image.jpg'

const MoviesCard = ({movie, baseUrl, setFavorite}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const goToMoviePage = () => {
        if (location.pathname === `/movie/${movie.id}`) {
            return
        } else {
            navigate(`/movie/${movie.id}`,{replace:true, state:`${location.pathname}`});
        }
    }

    const addFavorite = (id) => {
        setFavorite(id)
        if (movie.isFavorite) {
            localStorage.removeItem(`${id}_movieID`)
        } else {
            localStorage.setItem(`${id}_movieID`, JSON.stringify({...movie, isFavorite: true}))
        }
    }

    return(
        <div className = 'card-wrapper'>
            <div className = 'card-popular'>
                <IconButton style={{position: 'absolute', right: '0', top: '0', color: '#b71c1c'}} onClick={() => addFavorite(movie.id)}>
                    {movie.isFavorite ? <Favorite/> : <FavoriteBorder/>}
                </IconButton>
                <img src={movie?.poster_path === null ? Image : `${baseUrl}w500${movie?.poster_path}`} alt="poster" className='card-img' onClick={goToMoviePage}/>
            </div>
        </div>
    )
}

export default MoviesCard
// Сделать что бы при отсутсвии фильма не отображалось сердечко