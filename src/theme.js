import { createTheme } from '@mui/material/styles';

import { blue } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[400]
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Raleway',
    ].join(','),
  },
});
