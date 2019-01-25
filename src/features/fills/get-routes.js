import { URL } from '../../constants';
import AsyncFillPage from './components/async-fill-page';
import AsyncFillsPage from './components/async-fills-page';
import createPageRoute from '../../util/create-page-route';

const getRoutes = () => [
  createPageRoute(URL.FILLS, AsyncFillsPage),
  createPageRoute(URL.FILL, AsyncFillPage),
];

export default getRoutes;
