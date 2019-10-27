import { URL } from '../../constants';

const getHomeRoutes = () => [
  {
    loader: () => import('./components/home-page'),
    path: URL.HOME,
  },
];

export default getHomeRoutes;
