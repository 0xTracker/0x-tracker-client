import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import DashboardPage from './components/dashboard-page';

const getDashboardRoutes = () => [
  <Route
    component={DashboardPage}
    exact
    key="dashboard"
    path={URL.DASHBOARD}
  />,
];

export default getDashboardRoutes;
