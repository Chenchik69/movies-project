import { useState, useEffect } from 'react';
import { Drawer } from '@mui/material'

import ErrorMessage from './ErrorMessage'

const SideBar = ({movies}) => {

    const [moviesId, setMoviesId] = useState([])
    const [trailerKey, setTrailerKey] = useState('')
    const [isError, setIsError] = useState(false)
    const [sideBarOpen, setSideBarOpen] = useState(false)
    
    const getAllVideo = async () => {
        setIsError(false)
        const res = await fetch(`https://api.themoviedb.org/3/movie/${moviesId[0]}/videos?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`)
        if(!res.ok) {
            return Promise.reject('Videos not found')
        } else {
            const video = await res.json()
            return Promise.resolve(video?.results)
        }
    }

    const getMoviesIds = () => {
        const iDs = movies.map(movie => movie.id)
        setMoviesId(iDs)
    }

    const getTrailerKey = (videos) => {
        if (videos?.length) {
            const trailer = videos.find((item => item.type === "Trailer"))
            if (trailer) {
                setTrailerKey(trailer.key)
            }
        }
    }

    useEffect(() => {
       if (movies.length) {
        getMoviesIds()
       }
    }, [movies])

    useEffect(() => {
        if (moviesId.length) {
            getAllVideo().then((res) => getTrailerKey(res)).catch(() => {setIsError(true)})
        }
    }, [moviesId])

    const closeSideBar = () => setSideBarOpen(false)
    const handleSideBar = () => {
        setSideBarOpen(true)
  }

    return(
    <>  
        <button onClick={handleSideBar}>side bar</button>
        <Drawer
        anchor='left'
        open={sideBarOpen}
        onClose={closeSideBar}
        >
            {
                isError 
                ? <ErrorMessage/> 
                : <iframe width="560" height="315" 
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                >
                </iframe>
            }
        </Drawer>
    </>
    )
}

export default SideBar