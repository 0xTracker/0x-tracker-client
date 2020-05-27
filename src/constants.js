const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const API_CALL_TIMEOUT = process.env.REACT_APP_API_CALL_TIMEOUT || 30000;

const BREAKPOINTS = {
  xs: 575,
  sm: 767, // eslint-disable-line sort-keys
  md: 991, // eslint-disable-line sort-keys
  lg: 1199, // eslint-disable-line sort-keys
  xl: Infinity,
};

const TIME_PERIOD = {
  ALL: 'all',
  DAY: 'day',
  MONTH: 'month',
  WEEK: 'week',
  YEAR: 'year',
};

const METRIC_GRANULARITY = {
  DAY: 'day',
  HOUR: 'hour',
  MONTH: 'month',
  WEEK: 'week',
};

const DATE_FORMAT = {
  COMPACT: 'compact',
  FULL: 'fill',
  RELATIVE: 'relative',
  STANDARD: 'standard',
};

const GENESIS_DATE = new Date('2017-08-15T00:00:00Z');

const URL = {
  AD_MANAGER: '/ad-manager',
  ADVERTISE: '/advertise',
  ASSET_BRIDGES: '/asset-bridges',
  FILL: '/fills/:id',
  FILLS: '/fills',
  HOME: '/',
  NETWORK_INSIGHTS: '/network-insights',
  NEWS: '/news-and-updates',
  PRIVACY: '/privacy',
  RELAYER: '/relayers/:slug',
  RELAYERS: '/relayers',
  SEARCH: '/search',
  TERMS: '/terms',
  TOKEN: '/tokens/:address',
  TOKENS: '/tokens',
  TRADER: '/traders/:address',
  TRADERS: '/traders',
};

const ETH_TOKEN = {
  symbol: 'ETH',
};

const ZRX_TOKEN = {
  address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
  symbol: 'ZRX',
};

export {
  API_CALL_TIMEOUT,
  API_ENDPOINT,
  BREAKPOINTS,
  DATE_FORMAT,
  GENESIS_DATE,
  METRIC_GRANULARITY,
  TIME_PERIOD,
  URL,
  ETH_TOKEN,
  ZRX_TOKEN,
};
