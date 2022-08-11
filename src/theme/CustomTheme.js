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
            text: {
              primary: grey[900],  
              secondary: grey[800],
            },
            background: {
              default: '#fafafa',
              paper: '#4db6ac',
              },
          }
        : {
            primary: {
              main:'#00695c'
            },
            secondary: {
              main: '#cddc39'
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
            background: {
              default: '#303030',
              paper: '#004d40',
            },
          }),
    },
  });

  export default CustomTheme