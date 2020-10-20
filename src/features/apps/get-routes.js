import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(/* webpackChunkName: "page-apps" */ './components/apps-page'),
    path: URL.APPS,
  },
  {
    loader: () =>
      import(/* webpackChunkName: "page-app" */ './components/app-page'),
    path: URL.APP,
  },
  {
    loader: () =>
      import(/* webpackChunkName: "page-relayers" */ './components/apps-page'),
    path: URL.RELAYERS,
  },
  {
    loader: () =>
      import(/* webpackChunkName: "page-relayer" */ './components/app-page'),
    path: URL.RELAYER,
  },
];

export default getRoutes;
