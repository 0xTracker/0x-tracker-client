import _ from 'lodash';
import { Switch } from 'react-router-dom';
import React from 'react';

import AnalyticsRoute from './analytics-route';
import createPageRoute from '../util/create-page-route';
import getAddressesRoutes from '../features/addresses/get-routes';
import getDashboardRoutes from '../features/dashboard/get-dashboard-routes';
import getFillsRoutes from '../features/fills/get-routes';
import getNewsRoutes from '../features/news/get-routes';
import getRelayersRoutes from '../features/relayers/get-routes';
import getSearchRoutes from '../features/search/get-routes';
import getTokensRoutes from '../features/tokens/get-routes';

const routes = _.flatten([
  getDashboardRoutes(),
  getFillsRoutes(),
  getNewsRoutes(),
  getRelayersRoutes(),
  getSearchRoutes(),
  getTokensRoutes(),
  getAddressesRoutes(),
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
