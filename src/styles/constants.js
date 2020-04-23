const breakpoints = {
  sm: 576,
  md: 768, // eslint-disable-line sort-keys
  lg: 992, // eslint-disable-line sort-keys
  xl: 1200,
};

const colors = {
  alabaster: '#fafafa',
  anzac: '#e3be47',
  athensGray: '#f1f2f7', // regular gray
  athensGrayer: '#e6e7f0',
  black: '#000',
  indigo: '#3f4ac3', // links
  lavenderGray: '#bfbedf',
  martinique: '#312F50',
  mischka: '#d5d7e3',
  mystic: '#dbddea',
  santasGray: '#9F9EB9',
  spunPearl: '#a8aab9',
  stormGray: '#6C6B80',
  violet: '#0A0830', // text color & footer bg
};

const protocolColors = {
  1: colors.lavenderGray,
  2: colors.violet,
  3: colors.indigo,
};

const COLORS = {
  NEUTRAL: {
    MYSTIC_100: 'hsl(230, 85%, 99%)',
    MYSTIC_200: 'hsl(230, 45%, 96%)',
    MYSTIC_300: 'hsl(230, 35%, 90%)',
    MYSTIC_400: 'hsl(230, 30%, 84%)',
    MYSTIC_500: 'hsl(230, 23%, 75%)',
    MYSTIC_600: 'hsl(235, 18%, 64%)',
    MYSTIC_700: 'hsl(235, 12%, 52%)',
    MYSTIC_800: 'hsl(235, 12%, 42%)',
    MYSTIC_900: 'hsl(235, 14%, 30%)',
    MYSTIC_1000: 'hsl(235, 12%, 22%)',
  },
  PRIMARY: {
    SCAMPI_100: 'hsl(244, 80%, 90%)',
    SCAMPI_200: 'hsl(244, 50%, 80%)',
    SCAMPI_300: 'hsl(244, 40%, 70%)',
    SCAMPI_400: 'hsl(244, 35%, 60%)',
    SCAMPI_500: 'hsl(244, 27%, 50%)',
    SCAMPI_600: 'hsl(244, 30%, 42%)',
    SCAMPI_700: 'hsl(244, 30%, 35%)',
    SCAMPI_800: 'hsl(244, 30%, 25%)',
    SCAMPI_900: 'hsl(244, 34%, 20%)',
    SCAMPI_1000: 'hsl(244, 40%, 15%)',
  },
  // eslint-disable-next-line sort-keys
  ACCENT: {
    ANZAC_100: 'hsl(50, 100%, 75%)',
    ANZAC_200: 'hsl(47, 100%, 70%)',
    ANZAC_300: 'hsl(47, 95%, 67%)',
    ANZAC_400: 'hsl(47, 95%, 60%)',
    ANZAC_500: 'hsl(46, 90%, 58%)',
    ANZAC_600: 'hsl(46, 90%, 50%)',
    ANZAC_700: 'hsl(46, 90%, 45%)',
    ANZAC_800: 'hsl(46, 95%, 40%)',
    ANZAC_900: 'hsl(44, 95%, 35%)',
    ANZAC_1000: 'hsl(44, 95%, 30%)',
    FRUIT_SALAD_100: 'hsl(125, 95%, 90%)',
    FRUIT_SALAD_200: 'hsl(125, 65%, 80%)',
    FRUIT_SALAD_300: 'hsl(125, 55%, 70%)',
    FRUIT_SALAD_400: 'hsl(125, 50%, 60%)',
    FRUIT_SALAD_500: 'hsl(125, 45%, 50%)',
    FRUIT_SALAD_600: 'hsl(125, 50%, 40%)',
    FRUIT_SALAD_700: 'hsl(125, 50%, 30%)',
    FRUIT_SALAD_800: 'hsl(125, 55%, 20%)',
    FRUIT_SALAD_900: 'hsl(125, 55%, 15%)',
    FRUIT_SALAD_1000: 'hsl(125, 55%, 10%)',
    POMEGRANATE_100: 'HSL(4, 95%, 90%)',
    POMEGRANATE_200: 'HSL(4, 95%, 85%)',
    POMEGRANATE_300: 'HSL(4, 95%, 75%)',
    POMEGRANATE_400: 'HSL(4, 85%, 64%)',
    POMEGRANATE_500: 'HSL(4, 75%, 50%)',
    POMEGRANATE_600: 'HSL(4, 85%, 40%)',
    POMEGRANATE_700: 'HSL(4, 90%, 30%)',
    POMEGRANATE_800: 'HSL(2, 95%, 20%)',
    POMEGRANATE_900: 'HSL(2, 95%, 15%)',
    POMEGRANATE_1000: 'HSL(4, 96%, 11%)',
  },
};

export { breakpoints, colors, COLORS, protocolColors };
