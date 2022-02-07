import { createTheme, ThemeProvider } from '@mui/material/styles';
export const theme = createTheme({
  palette: {
    primary: {
      main: '#a57548',
      light: '#b7906c',
      dark: 'rgb(115, 81, 50)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#82ddf0',
      light: 'rgb(155, 227, 243)',
      dark: 'rgb(91, 154, 168)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#f6c28b',
    },
    error: {
      main: '#f44336',
      light: 'rgb(246, 104, 94)',
      dark: 'rgb(170, 46, 37)',
    },
    warning: {
      main: '#ff9800',
      light: 'rgb(255, 172, 51)',
      dark: 'rgb(178, 106, 0)',
    },
    success: {
      main: '#4caf50',
      light: 'rgb(111, 191, 115)',
      dark: 'rgb(53, 122, 56)',
    },
    info: {
      main: '#2196f3',
      light: 'rgb(77, 171, 245)',
      dark: 'rgb(23, 105, 170)',
    },
  },
});