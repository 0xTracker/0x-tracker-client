import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-apps" */
        './components/apps-page'
      ),
    path: URL.APPS,
  },
];

export default getRoutes;
