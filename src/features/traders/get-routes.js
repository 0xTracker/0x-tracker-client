import { URL } from '../../constants';

const getRoutes = () => [
  {
    loader: () =>
      import(/* webpackChunkName: "page-trader" */ './components/trader-page'),
    path: URL.TRADER,
  },
  {
    loader: () =>
      import(
        /* webpackChunkName: "page-traders" */ './components/traders-page'
      ),
    path: URL.TRADERS,
  },
];

export default getRoutes;
