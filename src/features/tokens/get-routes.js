import { URL } from '../../constants';

const getRoutes = () => [
  { loader: () => import('./components/tokens-page'), path: URL.TOKENS },
  { loader: () => import('./components/token-page'), path: URL.TOKEN },
];

export default getRoutes;
