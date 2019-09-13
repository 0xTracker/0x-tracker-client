import { URL } from '../../constants';

const getRoutes = () => [
  { loader: () => import('./components/trader-page'), path: URL.TRADER },
  { loader: () => import('./components/traders-page'), path: URL.TRADERS },
];

export default getRoutes;
