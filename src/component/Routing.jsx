import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home-page';
import Movies from '../pages/Movie-page';
import FavoriteMovies from '../pages/Favorite-movies';
import Login from '../pages/Login-page';
import AuthProtectedRoute from './AuthProtectedRoute'

import PrivatRoutes from './PrivatRoutes';
import LayoutMoviePage from './LayoutMoviePage';

const Routing = () => {
    return (
        <Routes>
          <Route path='log-in' element={<Login/>}/>
          <Route path="u/*" element={<AuthProtectedRoute component={PrivatRoutes}/>}/>
          <Route path="*" element={<Navigate to='/log-in'/>} replace={true}/>
        </Routes>
    )
}

export default Routing
