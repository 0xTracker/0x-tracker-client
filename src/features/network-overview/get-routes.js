import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () => import('./components/network-overview-page'),
    path: URL.NETWORK_OVERVIEW,
  },
];

export default getRoutes;
