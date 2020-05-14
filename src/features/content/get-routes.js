import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-privacy" */
        './components/privacy-page'
      ),
    path: URL.PRIVACY,
  },
  {
    loader: () =>
      import(/* webpackChunkName: "page-terms" */ './components/terms-page'),
    path: URL.TERMS,
  },
];

export default getRoutes;
