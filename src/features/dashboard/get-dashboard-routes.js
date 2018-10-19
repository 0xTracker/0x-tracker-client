import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import AsyncDashboardPage from './components/async-dashboard-page';

const getDashboardRoutes = () => [
  <Route
    component={AsyncDashboardPage}
    exact
    key="dashboard"
    path={URL.DASHBOARD}
  />,
];

export default getDashboardRoutes;
