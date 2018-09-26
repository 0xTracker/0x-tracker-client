import { Route, Switch } from 'react-router-dom';
import React from 'react';

import getDashboardRoutes from '../features/dashboard/get-dashboard-routes';
import getFillsRoutes from '../features/fills/get-routes';
import getNewsRoutes from '../features/news/get-routes';
import getRelayersRoutes from '../features/relayers/get-routes';
import getSearchRoutes from '../features/search/get-routes';
import getTokensRoutes from '../features/tokens/get-routes';
import PageNotFound from './page-not-found';

const Routes = () => (
  <Switch>
    {getDashboardRoutes()}
    {getFillsRoutes()}
    {getNewsRoutes()}
    {getRelayersRoutes()}
    {getSearchRoutes()}
    {getTokensRoutes()}
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
