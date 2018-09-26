import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import SearchPage from './components/search-page';

const getRoutes = () => [
  <Route component={SearchPage} exact key="search" path={URL.SEARCH} />,
];

export default getRoutes;
