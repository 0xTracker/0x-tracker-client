import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-ad-manager" */ './components/ad-manager-page'
      ),
    path: URL.AD_MANAGER,
  },
  {
    loader: () => import('./components/advertise-page'),
    path: URL.ADVERTISE,
  },
];

export default getRoutes;
