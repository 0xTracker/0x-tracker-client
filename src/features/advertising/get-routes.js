import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () => import('./components/ad-manager-page'),
    path: URL.AD_MANAGER,
  },
];

export default getRoutes;
