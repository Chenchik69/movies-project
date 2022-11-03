import Spinner from "../component/Spinner";
import MoviesCard from '../component/MoviesCard';

import '../styles/MoviesList.css'
import { useSelector } from "react-redux";

const MoviesList = ({loading,reducerName,currentMoviesList,setToastActive,setFavorite}) => {

    const movies = useSelector((state) => state[reducerName][currentMoviesList])

    const renderPopular = () => movies.map(movie => <MoviesCard 
        key={movie.id} 
        movie={movie}
        setToastActive={setToastActive}
        setFavorite={setFavorite}
        />)

    return (
            <>
                <div className='movies-list-wrapper'>
                    {loading && <Spinner/>}
                    {!loading && !!movies?.length && renderPopular()}
                    {!loading && !movies?.length && 'There are no selected movies yet'}
                </div>
            </>
    )
}

export default MoviesList

   