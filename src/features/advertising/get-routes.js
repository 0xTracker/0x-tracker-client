import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-ad-manager" */ './components/ad-manager-page'
      ),
    path: URL.AD_MANAGER,
  },
];

export default getRoutes;
