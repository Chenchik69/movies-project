import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Layout from './Layout';
import LayoutMoviePage from './LayoutMoviePage';
import Header from "./Header"
import Home from '../pages/Home-page';
import Movies from '../pages/Movie-page';
import FavoriteMovies from '../pages/Favorite-movies';

import { Paper, Container } from '@mui/material';


const PrivatRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='layout' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='favorite' element={<FavoriteMovies/>}/>
          <Route path='movie' element={<LayoutMoviePage/>}>
            <Route path=':id' element={<Movies/>}/>
          </Route>
          <Route path='*' element={<Navigate to="/home" />}/>
        </Route>
          
      </Routes>
    </>
  )
}

export default PrivatRoutes