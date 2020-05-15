import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-article" */ './components/article-page'
      ),
    path: [`${URL.NEWS}/:source/:slug`],
  },
  {
    loader: () =>
      import(/* webpackChunkName: "page-news" */ './components/news-page'),
    path: [URL.NEWS, `${URL.NEWS}/:source`],
  },
];

export default getRoutes;
