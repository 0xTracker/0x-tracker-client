import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import TokenPage from './components/token-page';
import TokensPage from './components/tokens-page';

const getRoutes = () => [
  <Route component={TokensPage} exact key="tokens" path={URL.TOKENS} />,
  <Route component={TokenPage} exact key="token" path={URL.TOKEN} />,
];

export default getRoutes;
