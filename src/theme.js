// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D4006D', // Your fuchsia color
      light: '#ff4d99',
      dark: '#9c0044',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#fadde1', // Your primary (baby pink) color
      light: '#ffffff',
      dark: '#c7acaf',
      contrastText: '#000000',
    },
    text: {
      primary: '#333333', // Your text color
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Prevents all-caps buttons
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#D4006D',
            color: 'white',
            fontWeight: 500,
          },
        },
      },
    },
  },
});

export default theme;