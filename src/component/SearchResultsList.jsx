import Spinner from "../component/Spinner";
import MoviesCard from '../component/MoviesCard'

import {IconButton } from '@mui/material';
import {ArrowBackIosNew, ArrowForwardIos} from '@mui/icons-material';

const SearchResultsList = ({loading,baseUrl,setFavorite,movies}) => {

    const renderSearchResult = () => movies.map(movie => <MoviesCard key={movie.id} movie={movie} baseUrl={baseUrl} setFavorite={setFavorite}/>)
    
    return ( 
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', border:'1px solid black'}}>
                    <IconButton>
                        <ArrowBackIosNew/>
                    </IconButton>
                </div>   
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', padding:'2rem', width:'880px'}}>
                    {loading && <Spinner/>}
                    {!loading && !!movies.length && renderSearchResult()}
                    {!loading && !movies.length && null}
                </div> 
                <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', border:'1px solid black'}}>
                    <IconButton>
                        <ArrowForwardIos/>
                    </IconButton>
                </div> 
            </div> 
    )
}

export default SearchResultsList