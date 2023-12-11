import { memo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const primaryColor = '#4B506D;';
const secondaryColor = '#101828;';
const errorColor = '#cc272a';

const primaryBackgroundColor = '#E6D6FF';
const mainBorderColor = '#BF93FF';

export const screen = {
  sm: 480,
  md: 820,
  lg: 1024,
  mLg: 1450,
  xLg: 1920,
};

declare module '@emotion/react' {
  interface Theme extends ThemeType {}
}
declare module '@mui/material/styles' {
  interface ThemeOptions extends ThemeType {}
}

const themeProperties = {
  colors: {
    pageBackground: primaryBackgroundColor,
    mainText: primaryColor,
    secondaryText: secondaryColor,
    mainBorder: mainBorderColor,
    errorText: errorColor,
  },
  padding: {
    sSm: '2px 5px',
    sm: '3px 10px',
    md: '5px 15px',
    lg: '10px 20px',
    xLg: '15px 30px',
  },
  margin: {},
  font: {
    size: {
      globalValue: '16px',
      xSm: '0.75rem',
      sm: '0.88rem',
      md: '1rem',
      xMd: '1.13rem',
      sLg: '1.25rem',
      lg: '1.5rem',
      xLg: '2rem',
    },
    family: {
      main: "'Poppins', sans-serif",
    },
    weight: {
      xSm: 300,
      sm: 400,
      md: 500,
      sLg: 600,
      lg: 700,
      xLg: 900,
    },
    lineHeight: {
      main: '130%',
    },
    letterSpacing: '-0.02em',
  },
  widths: {
    main: {
      section: 1240,
    },
  },
  screen,
  transitionValue: 0.15,
  transition: '0.15s',
  header: {
    minHeight: '97.1px',
    backgroundColor: '#F8F8F8',
  },
  palette: {
    primary: {
      main: '#319FD6',
    },
    error: {
      main: errorColor,
    },
  },
  typography: {
    fontFamily: ["'Lato'", 'sans-serif'].join(','),
  },
};

export type ThemeType = typeof themeProperties;

const theme = createTheme(themeProperties);

type PropType = {
  children?: JSX.Element | JSX.Element[];
};

const EmotionProvider: React.FC<PropType> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default memo(EmotionProvider);
