import { useState, useMemo } from 'react';

import { ThemeProvider, createTheme, Paper} from '@mui/material';

import Routing from './component/Routing';

import { MoveaContext } from './context/MoveaContext';
import CustomTheme from './theme/CustomTheme';

import './App.css';

function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mode, setMode] = useState('light');

  const closeSearch = () => setSearchOpen(false)
  const handleSearch = () => {
    setSearchOpen(true)
  }

  const theme = useMemo(() => createTheme(CustomTheme(mode)), [mode]);

  const toggleColorMode = () => {
      setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
  }
  
  return (
    <MoveaContext.Provider value={{mode, toggleColorMode, searchOpen, closeSearch, handleSearch}}>
      <ThemeProvider theme={theme}>
        {/* <Paper className="App"> */}
          <Routing/>
        {/* </Paper> */}
      </ThemeProvider>
    </MoveaContext.Provider>
  );
}

export default App;
