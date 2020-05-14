import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(/* webpackChunkName: "page-search" */ './components/search-page'),
    path: URL.SEARCH,
  },
];

export default getRoutes;
