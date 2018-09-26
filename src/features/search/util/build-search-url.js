import { URL } from '../../../constants';

const buildSearchUrl = searchQuery =>
  `${URL.SEARCH}?q=${encodeURIComponent(searchQuery)}`;

export default buildSearchUrl;
