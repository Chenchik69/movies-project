import { useContext } from 'react';
import { MoveaContext } from '../context/MoveaContext';

import {IconButton} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const ThemeSwitch = () => {
  const {mode, toggleColorMode} = useContext(MoveaContext)
      return (
        <>
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </>
      )
}

export default ThemeSwitch