import { Route } from 'react-router-dom';
import React from 'react';

import { URL } from '../../constants';
import NewsPage from './components/news-page';

const getRoutes = () => [
  <Route component={NewsPage} exact key="news" path={URL.NEWS} />,
];

export default getRoutes;
