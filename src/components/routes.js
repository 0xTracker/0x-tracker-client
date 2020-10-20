import _ from 'lodash';
import { Switch } from 'react-router-dom';
import React from 'react';

import createPageRoute from '../util/create-page-route';
import getAdvertisingRoutes from '../features/advertising/get-routes';
import getAppsRoutes from '../features/apps/get-routes';
import getAssetBridgesRoutes from '../features/asset-bridges/get-routes';
import getContentRoutes from '../features/content/get-routes';
import getFillsRoutes from '../features/fills/get-routes';
import getHomeRoutes from '../features/home/get-home-routes';
import getNetworkOverviewRoutes from '../features/network-overview/get-routes';
import getNewsRoutes from '../features/news/get-routes';
import getRelayersRoutes from '../features/relayers/get-routes';
import getSearchRoutes from '../features/search/get-routes';
import getTokensRoutes from '../features/tokens/get-routes';
import getTradersRoutes from '../features/traders/get-routes';

const routes = _.flatten([
  getAdvertisingRoutes(),
  getContentRoutes(),
  getHomeRoutes(),
  getFillsRoutes(),
  getNetworkOverviewRoutes(),
  getNewsRoutes(),
  getRelayersRoutes(),
  getSearchRoutes(),
  getTokensRoutes(),
  getTradersRoutes(),
  getAssetBridgesRoutes(),
  getAppsRoutes(),
  {
    key: '404',
    loader: () =>
      import(
        /* webpackChunkName: "page-not-found" */
        './page-not-found'
      ),
  },
]);

const routeComponents = routes.map((route) =>
  createPageRoute(route.path, route.loader, route.key),
);

const Routes = () => <Switch>{routeComponents}</Switch>;

export default Routes;
