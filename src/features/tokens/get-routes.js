import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(/* webpackChunkName: "page-tokens" */ './components/tokens-page'),
    path: URL.TOKENS,
  },
  {
    loader: () =>
      import(/* webpackChunkName: "page-token" */ './components/token-page'),
    path: URL.TOKEN,
  },
];

export default getRoutes;
