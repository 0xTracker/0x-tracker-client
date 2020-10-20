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
];

export default getRoutes;
