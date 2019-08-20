import { URL } from '../../constants';

const getRoutes = () => [
  { loader: () => import('./components/address-page'), path: URL.ADDRESS },
  { loader: () => import('./components/addresses-page'), path: URL.ADDRESSES },
];

export default getRoutes;
