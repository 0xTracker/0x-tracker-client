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
  fruitSalad: '#4CAF50', // positive change
  haiti: '#171540',
  indigo: '#3f4ac3', // links
  lavenderGray: '#bfbedf',
  martinique: '#312F50',
  mischka: '#d5d7e3',
  mystic: '#dbddea',
  periwinkleGray: '#cdcded',
  pomegranate: '#F44336', // negative change
  santasGray: '#9F9EB9',
  spunPearl: '#a8aab9',
  steelGray: '#212035',
  stormGray: '#6C6B80',
  violet: '#0A0830', // text color & footer bg
  white: '#fff', // light text color
};

const protocolColors = {
  1: colors.lavenderGray,
  2: colors.violet,
  3: colors.indigo,
};

export { breakpoints, colors, protocolColors };
