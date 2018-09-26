import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import FillPage from './components/fill-page';
import FillsPage from './components/fills-page';

const getRoutes = () => [
  <Route component={FillsPage} exact key="fills" path={URL.FILLS} />,
  <Route component={FillPage} exact key="fill" path={URL.FILL} />,
];

export default getRoutes;
