import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import MoviesCard  from "../component/MoviesCard"

import {Button} from '@mui/material'

import Spinner from "../component/Spinner";

import '../styles/MoviePage.css'

const Movies = () => {
    const [movie, setMovie] = useState(null)
    const [baseUrl, setBaseUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [posterSizes, setPosterSizes] = useState(["w92", "w154", "w185", "w342", "w500", "w780", "original"])
    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const fromPage = location.state
    
    const keys = Object.keys(localStorage).filter(item => item.includes('_movieID'))
    useEffect(()=>{
        const getMovie = async () => {

            try {
                setLoading(true)

                const config = await (await fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_APIKEY}`)).json()
                setBaseUrl(config?.images?.secure_base_url)
                localStorage.setItem('secure_base_url', config?.images?.secure_base_url)
                setPosterSizes(config?.images?.poster_sizes)
                
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`)
                if (res.ok && res.status === 200) {
                    const data = await res.json()
                    const isFavorite = keys.length ? keys.includes(`${data.id}_movieID`) : false
                    setMovie({...data, isFavorite})
                    setLoading(false)
                } else {
                    throw new Error('Movie is not found')
                }
            } catch (e) {
                setLoading(false)
            }
        }
        getMovie()
    },[])

    const renderGenres = (genres) => {
        return genres.map((item) => <span key={item.id}> {item.name}</span>)
    }

    const setFavorite = () => {
        setMovie({...movie, isFavorite : !movie.isFavorite})
        }

    const goBack = () => {
        navigate(fromPage)
    }

    return (
        <div className="movie-page-wrapper">
            { loading && <Spinner/> }
            { (!loading && !!movie) ? <div className="movie-content-wrapper">
            <div className="bg-backdrop" style={{backgroundImage:`url(${baseUrl}original${movie?.backdrop_path})`}}>
                <div className="movie-content">
                    {/* <MoviesCard key={movie.id} movie={movie} baseUrl={baseUrl} setFavorite={setFavorite}/> */}
                    <div className="bg-poster" style={{backgroundImage:`url(${baseUrl}original${movie?.poster_path})`}}></div>
                    <div className="movie-info" style={{marginLeft: '1rem'}}>
                        <h2 className="movie-name">{movie.original_title} ({movie.release_date})</h2>
                        <p className="movie-genres">{!!movie?.genres?.length && renderGenres(movie.genres)}</p>
                        <h3 style={{marginTop:'0.5rem',marginBottom:'0.5rem'}}>Overview:</h3> 
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div> 
            </div>: 'Movie is not defined'}
            <Button variant="contained" onClick={goBack} className='go-back-btn'>Go Back</Button>
        </div>
        )
}

export default Movies