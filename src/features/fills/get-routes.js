import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import AsyncFillPage from './components/async-fill-page';
import AsyncFillsPage from './components/async-fills-page';

const getRoutes = () => [
  <Route component={AsyncFillsPage} exact key="fills" path={URL.FILLS} />,
  <Route component={AsyncFillPage} exact key="fill" path={URL.FILL} />,
];

export default getRoutes;
