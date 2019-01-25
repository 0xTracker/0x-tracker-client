import { URL } from '../../constants';
import AsyncSearchPage from './components/async-search-page';
import createPageRoute from '../../util/create-page-route';

const getRoutes = () => [createPageRoute(URL.SEARCH, AsyncSearchPage)];

export default getRoutes;
