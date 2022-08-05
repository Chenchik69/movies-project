import { useEffect, useState, useContext } from "react";

import SideBar from "../component/SideBar";
import MoviesList from '../component/MoviesList'
import MoviesSwitch from '../component/MoviesSwitch'
import Search from "../component/Search"
import { MoveaContext } from "../context/MoveaContext";

import {Container} from '@mui/material'

import '../styles/Home-page.css'


const Home = () => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [baseUrl, setBaseUrl] = useState('')
    const [posterSizes, setPosterSizes] = useState(["w92", "w154", "w185", "w342", "w500", "w780", "original"])
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState('popular')
    const {searchOpen, closeSearch} = useContext(MoveaContext)

    const keys = Object.keys(localStorage).filter(item => item.includes('_movieID'))
   
    useEffect(()=>{
        const getPopular = async () => {

            setLoading(true)

            const config = await (await fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_APIKEY}`)).json()
            setBaseUrl(config?.images?.secure_base_url)
            localStorage.setItem('secure_base_url', config?.images?.secure_base_url)
            setPosterSizes(config?.images?.poster_sizes)
            
            const res = await (await fetch(`https://api.themoviedb.org/3/movie/${active}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=${page}`)).json()
            setMovies(res?.results.map((item) => {
                const isFavorite = keys.length ? keys.includes(`${item.id}_movieID`) : false
                return {
                    ...item,
                    isFavorite
                }
            }))
            setLoading(false)
        }
        getPopular().catch(console.error)
    },[active])

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

    return(
        <>
            <Container>
                <Search
                    loading={loading}
                    baseUrl={baseUrl}
                    searchOpen={searchOpen}
                    closeSearch={closeSearch}
                />
                <MoviesSwitch
                    active={active}
                    setActive={setActive}
                />
                <MoviesList 
                    loading={loading}
                    movies={movies}
                    baseUrl={baseUrl}
                    active={active}
                    setActive={setActive}
                    setFavorite={setFavorite}
                />
                <SideBar
                    movies={movies}
                />
            </Container>   
        </>
        
    )

}

export default Home