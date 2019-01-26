import { URL } from '../../constants';

const getRoutes = () => [
  { loader: () => import('./components/relayers-page'), path: URL.RELAYERS },
  { loader: () => import('./components/relayer-page'), path: URL.RELAYER },
];

export default getRoutes;
