import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-network-overview" */ './components/network-overview-page'
      ),
    path: URL.NETWORK_INSIGHTS,
  },
];

export default getRoutes;
