import { URL } from '../../constants';

const getHomeRoutes = () => [
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-home" */
        './components/home-page'
      ),
    path: URL.HOME,
  },
];

export default getHomeRoutes;
