import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import {IconButton, AppBar, Typography, Toolbar, List, Container} from '@mui/material';
import {Search } from '@mui/icons-material';

import ThemeSwitch from './ThemeSwitch';
import { NavLink } from 'react-router-dom';
import { MoveaContext } from '../context/MoveaContext';

import '../styles/Header.css'

const setActive = ({isActive}) => isActive ? 'link active-link' : 'link not-active-link';
const Header = () => {
    const location = useLocation()
    const {handleSearch} = useContext(MoveaContext)

    const renderSearchIcon = () => {
        if(location.pathname === '/') {
            return (
                <IconButton 
                    onClick={handleSearch}
                >
                    <Search/>
                </IconButton>
            )
        }
    }

  return (
    <AppBar 
        className='header'
        position='static'
    >
        <Container maxWidth='xl'>
            <Toolbar
                sx={{display:'flex', justifyContent:'space-between'}}
            >
                <Typography 
                    variant='h3'
                    component='span' 
                >
                    Movea
                </Typography>
                <List>
                    <NavLink to='/' className={setActive}>Home</NavLink>
                    <NavLink to='/favorite' className={setActive}>Favorite Movies</NavLink>
                </List>
                <div>
                    {renderSearchIcon()}
                    <ThemeSwitch/>
                </div>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Header

