import Spinner from "../component/Spinner";
import MoviesCard from '../component/MoviesCard'

const SearchResultsList = ({loading,setFavorite,movies}) => {

    const renderSearchResult = () => movies.map(movie => <MoviesCard key={movie.id} movie={movie} setFavorite={setFavorite}/>)
    
    return ( 
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                </div>   
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', padding:'2rem'}}>
                    {loading && <Spinner/>}
                    {!loading && !!movies.length && renderSearchResult()}
                    {!loading && !movies.length && null}
                </div> 
                <div style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                </div> 
            </div> 
    )
}

export default SearchResultsList