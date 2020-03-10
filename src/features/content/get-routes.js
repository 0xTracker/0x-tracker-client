import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () => import('./components/privacy-page'),
    path: URL.PRIVACY,
  },
  {
    loader: () => import('./components/terms-page'),
    path: URL.TERMS,
  },
];

export default getRoutes;
