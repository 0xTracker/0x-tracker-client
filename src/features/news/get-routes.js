import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () => import('./components/news-page'),
    path: [URL.NEWS, `${URL.NEWS}/:source`],
  },
  {
    loader: () => import('./components/article-page'),
    path: [URL.NEWS, `${URL.NEWS}/:source/:id`],
  },
];

export default getRoutes;
