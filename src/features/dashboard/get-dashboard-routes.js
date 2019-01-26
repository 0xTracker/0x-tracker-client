import { URL } from '../../constants';

const getDashboardRoutes = () => [
  {
    loader: () => import('./components/dashboard-page'),
    path: URL.DASHBOARD,
  },
];

export default getDashboardRoutes;
