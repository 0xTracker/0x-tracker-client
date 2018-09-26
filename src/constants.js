import { parse as parseDate } from 'date-fns';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const TIME_PERIOD = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  ALL: 'all',
};

const DATE_FORMAT = {
  FULL: 'fill',
  RELATIVE: 'relative',
};

const GENESIS_DATE = parseDate('2017-08-15T00:00:00Z');

const URL = {
  DASHBOARD: '/',
  FILL: '/fills/:id',
  FILLS: '/fills',
  NEWS: '/news-and-updates',
  RELAYERS: '/relayers',
  RELAYER: '/relayers/:slug',
  SEARCH: '/search',
  TOKEN: '/tokens/:address',
  TOKENS: '/tokens',
};

const ZRX_TOKEN = {
  address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
  symbol: 'ZRX',
};

export { API_ENDPOINT, DATE_FORMAT, GENESIS_DATE, TIME_PERIOD, URL, ZRX_TOKEN };
