import { URL } from '../../constants';
import AsyncTokenPage from './components/async-token-page';
import AsyncTokensPage from './components/async-tokens-page';
import createPageRoute from '../../util/create-page-route';

const getRoutes = () => [
  createPageRoute(URL.TOKENS, AsyncTokensPage),
  createPageRoute(URL.TOKEN, AsyncTokenPage),
];

export default getRoutes;
