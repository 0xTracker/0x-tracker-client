import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import AsyncTokenPage from './components/async-token-page';
import AsyncTokensPage from './components/async-tokens-page';

const getRoutes = () => [
  <Route component={AsyncTokensPage} exact key="tokens" path={URL.TOKENS} />,
  <Route component={AsyncTokenPage} exact key="token" path={URL.TOKEN} />,
];

export default getRoutes;
