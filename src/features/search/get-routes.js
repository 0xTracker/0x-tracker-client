import { URL } from '../../constants';

const getRoutes = () => [
  { loader: () => import('./components/search-page'), path: URL.SEARCH },
];

export default getRoutes;
