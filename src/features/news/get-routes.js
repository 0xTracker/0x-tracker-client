import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () => import('./components/article-page'),
    path: [`${URL.NEWS}/:source/:slug`],
  },
  {
    loader: () => import('./components/news-page'),
    path: [URL.NEWS, `${URL.NEWS}/:source`],
  },
];

export default getRoutes;
