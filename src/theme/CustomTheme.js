import { amber, grey, deepOrange } from '@mui/material/colors';

const CustomTheme = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#80cbc4',
              light: '#b2dfdb',
              dark: '#4db6ac'
            },
            secondary: {
              main: '#212121'
            },
            background: {
              default: '#4db6ac',
              paper: '#4db6ac',
              },
            text: {
              primary: grey[900],  
              secondary: grey[800],
            },
          }
        : {
            primary: {
              main:'#00695c'
            },
            secondary: {
              main: '#cddc39'
            },
            background: {
              default: '#004d40',
              paper: '#004d40',
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
    },
  });

  export default CustomTheme