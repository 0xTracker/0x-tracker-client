import { URL } from '../../constants';
import AsyncRelayerPage from './components/async-relayer-page';
import AsyncRelayersPage from './components/async-relayers-page';
import createPageRoute from '../../util/create-page-route';

const getRoutes = () => [
  createPageRoute(URL.RELAYERS, AsyncRelayersPage),
  createPageRoute(URL.RELAYER, AsyncRelayerPage),
];

export default getRoutes;
