import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () => import('./components/network-overview-page'),
    path: URL.NETWORK_INSIGHTS,
  },
];

export default getRoutes;
