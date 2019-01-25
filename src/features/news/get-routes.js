import { URL } from '../../constants';
import AsyncNewsPage from './components/async-news-page';
import createPageRoute from '../../util/create-page-route';

const getRoutes = () => [
  createPageRoute([URL.NEWS, `${URL.NEWS}/:source`], AsyncNewsPage),
];

export default getRoutes;
