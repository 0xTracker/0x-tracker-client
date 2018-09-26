import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import RelayerPage from './components/relayer-page';
import RelayersPage from './components/relayers-page';

const getRoutes = () => [
  <Route component={RelayersPage} exact key="relayers" path={URL.RELAYERS} />,
  <Route component={RelayerPage} exact key="relayer" path={URL.RELAYER} />,
];

export default getRoutes;
