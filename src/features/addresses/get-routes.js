import { URL } from '../../constants';

const getRoutes = () => [
  { loader: () => import('./components/address-page'), path: URL.ADDRESS },
];

export default getRoutes;
