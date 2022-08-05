import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home-page';
import Movies from '../pages/Movie-page';
import FavoriteMovies from '../pages/Favorite-movies';

import Layout from './Layout';
import LayoutMoviePage from './LayoutMoviePage';

const Routing = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path='favorite' element={<FavoriteMovies/>}/>
              <Route path='movie' element={<LayoutMoviePage/>}>
                <Route path=':id' element={<Movies/>}/>
              </Route>
            </Route>
        </Routes>
    )
}

export default Routing