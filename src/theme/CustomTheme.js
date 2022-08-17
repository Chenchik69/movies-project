import { amber, grey, deepOrange } from '@mui/material/colors';

const CustomTheme = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#dcffdc',
              light: '#ffffff',
              dark: '#aaccaa'
            },
            secondary: {
              main: '#c0ca33',
              light: '#fbffff',
              dark: '#96ccaf'
            },
            text: {
              primary: grey[900],  
              secondary: grey[800],
            },
            background: {
              default: '#fafafa',
              paper: '#dcffdc',
              },
          }
        : {
            primary: {
              main:'#353d35',
              light:'#5f675f',
              dark:'#0f170f'
            },
            secondary: {
              main: '#c0ca33',
              light:'#54625a',
              dark:'#001209',
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
            background: {
              default: '#303030',
              paper: '#0f170f',
            },
          }),
    },
  });

  export default CustomTheme