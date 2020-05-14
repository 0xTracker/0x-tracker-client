import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(/* webpackChunkName: "page-fills" */ './components/fills-page'),
    path: URL.FILLS,
  },
  {
    loader: () =>
      import(/* webpackChunkName: "page-fill" */ './components/fill-page'),
    path: URL.FILL,
  },
];

export default getRoutes;
