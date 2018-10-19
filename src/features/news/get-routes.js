import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import AsyncNewsPage from './components/async-news-page';

const getRoutes = () => [
  <Route component={AsyncNewsPage} exact key="news" path={URL.NEWS} />,
];

export default getRoutes;
