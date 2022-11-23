import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const ColorModeContext = React.createContext('light');

const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = React.useState('light');

  const changeTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1d3369',
          },
          secondary: {
            main: '#ad0516',
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={{ changeTheme, theme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { ColorModeContext, ColorModeProvider };
