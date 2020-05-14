import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-asset-bridges" */
        './components/asset-bridges-page'
      ),
    path: URL.ASSET_BRIDGES,
  },
];

export default getRoutes;
