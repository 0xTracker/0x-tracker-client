import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () => import('./components/news-page'),
    path: [URL.NEWS, `${URL.NEWS}/:source`],
  },
];

export default getRoutes;
