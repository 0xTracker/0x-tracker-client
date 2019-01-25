import { URL } from '../../constants';
import AsyncDashboardPage from './components/async-dashboard-page';
import createPageRoute from '../../util/create-page-route';

const getDashboardRoutes = () => [
  createPageRoute(URL.DASHBOARD, AsyncDashboardPage),
];

export default getDashboardRoutes;
