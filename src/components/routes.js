import _ from 'lodash';
import { Switch } from 'react-router-dom';
import React from 'react';

import AnalyticsRoute from './analytics-route';
import createPageRoute from '../util/create-page-route';
import getFillsRoutes from '../features/fills/get-routes';
import getHomeRoutes from '../features/home/get-home-routes';
import getNewsRoutes from '../features/news/get-routes';
import getRelayersRoutes from '../features/relayers/get-routes';
import getSearchRoutes from '../features/search/get-routes';
import getTokensRoutes from '../features/tokens/get-routes';
import getTradersRoutes from '../features/traders/get-routes';

const routes = _.flatten([
  getHomeRoutes(),
  getFillsRoutes(),
  getNewsRoutes(),
  getRelayersRoutes(),
  getSearchRoutes(),
  getTokensRoutes(),
  getTradersRoutes(),
  { key: '404', loader: () => import('./page-not-found') },
]);

const routeComponents = routes.map(route =>
  createPageRoute(route.path, route.loader, route.key),
);

const Routes = () => (
  <>
    <AnalyticsRoute /> {/* Track page views */}
    <Switch>{routeComponents}</Switch>
  </>
);

export default Routes;
