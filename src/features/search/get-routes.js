import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import AsyncSearchPage from './components/async-search-page';

const getRoutes = () => [
  <Route component={AsyncSearchPage} exact key="search" path={URL.SEARCH} />,
];

export default getRoutes;
