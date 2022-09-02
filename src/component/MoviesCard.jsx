import { useState } from 'react'

import Modal from './Modal'

import {IconButton} from '@mui/material';
import {FavoriteBorder, Favorite, Star, StarBorder} from '@mui/icons-material'
import { useNavigate, useLocation} from 'react-router-dom';

import '../styles/MoviesCard.css'
import Image from '../images/no_image.jpg'

const MoviesCard = ({movie, baseUrl, setToastActive,setFavorite}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [modalActive, setModalActive] = useState(false)
    const [allowToRemoveMovie, setAllowToRemoveMovie] = useState(false)

    const goToMoviePage = () => {
        if (location.pathname === `/movie/${movie.id}`) {
            return
        } else {
            navigate(`/movie/${movie.id}`,{replace:true, state:`${location.pathname}`});
        }
    }

    const addFavorite = () => {
        setFavorite(movie.id)
        if (movie.isFavorite) {
            localStorage.removeItem(`${movie.id}_movieID`);
            setModalActive(false)
            setToastActive(false)
        } 
    }

    const showModal = () => {
        if (movie.isFavorite) {
            setModalActive(true)
            setToastActive(false)
        } else {
            setFavorite(movie.id)
            localStorage.setItem(`${movie.id}_movieID`, JSON.stringify({...movie, isFavorite: true}))
            setToastActive(true)
            setModalActive(false)
        }
    }

    const setActive = (status) => {
        setModalActive(status)
    }
    const setAllow = (status) => {
        setAllowToRemoveMovie(status)
        setModalActive(false)
    }

    return(
        <>
            {modalActive ? <Modal
                setModalActive={setActive}
                setAllow={setAllow}
                removeMovie={addFavorite}
            >
                <p>Are you sure you want to remove this movie from your Favorite Movies?</p>
            </Modal> : null} 
            <div className = 'card-wrapper'>
                <div className = 'card-popular'>
                    <IconButton style={{position: 'absolute', right: '0', top: '0', color: '#b71c1c'}} onClick={() => showModal()}>
                        {movie.isFavorite ? <Favorite/> : <FavoriteBorder/>}
                    </IconButton>
                    {/* <IconButton style={{position: 'absolute', left: '0', top: '0', color: '#ffdd00'}} onClick={() => addFavorite(movie.id)}>
                        {movie.isFavorite ? <Star/> : <StarBorder/>}
                    </IconButton> */}
                    <img src={movie?.poster_path === null ? Image : `${baseUrl}w500${movie?.poster_path}`} alt="poster" className='card-img' onClick={goToMoviePage}/>
                </div>
            </div>
        </>
    )
}

export default MoviesCard
// Сделать что бы при отсутсвии фильма не отображалось сердечко