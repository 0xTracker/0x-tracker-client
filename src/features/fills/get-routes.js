import { URL } from '../../constants';

const getRoutes = () => [
  { loader: () => import('./components/fills-page'), path: URL.FILLS },
  { loader: () => import('./components/fill-page'), path: URL.FILL },
];

export default getRoutes;
