import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import AsyncRelayerPage from './components/async-relayer-page';
import AsyncRelayersPage from './components/async-relayers-page';

const getRoutes = () => [
  <Route
    component={AsyncRelayersPage}
    exact
    key="relayers"
    path={URL.RELAYERS}
  />,
  <Route component={AsyncRelayerPage} exact key="relayer" path={URL.RELAYER} />,
];

export default getRoutes;
