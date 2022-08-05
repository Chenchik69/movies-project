import Spinner from "../component/Spinner";
import MoviesCard from '../component/MoviesCard';

import '../styles/MoviesList.css'

const MoviesList = ({loading,movies,baseUrl,setFavorite}) => {

    const renderPopular = () => movies.map(movie => <MoviesCard key={movie.id} movie={movie} baseUrl={baseUrl} setFavorite={setFavorite}/>)

    return (
            <>
                <div className='movies-list-wrapper'>
                    {loading && <Spinner/>}
                    {!loading && !!movies.length && renderPopular()}
                    {!loading && !movies.length && 'There are no selected movies yet'}
                </div>
            </>
    )
}

export default MoviesList

   