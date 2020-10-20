import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-relayers" */ './components/relayers-page'
      ),
    path: URL.RELAYERS,
  },
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-relayer" */ './components/relayer-page'
      ),
    path: URL.RELAYER,
  },
];

export default getRoutes;
