import { Helmet } from 'react-helmet';
import React from 'react';

import Card from '../../../components/card';
import Fills from './fills';
import PageLayout from '../../../components/page-layout';

const FillsPage = () => (
  <>
    <Helmet>
      <title>Browse Fills</title>
    </Helmet>
    <PageLayout title="Browse Fills">
      <Card fullHeight>
        <Fills />
      </Card>
    </PageLayout>
  </>
);

export default FillsPage;
