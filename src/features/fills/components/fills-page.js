import { Helmet } from 'react-helmet';
import React from 'react';

import { URL } from '../../../constants';
import Card from '../../../components/card';
import Fills from './fills';
import PageLayout from '../../../components/page-layout';

const FillsPage = () => (
  <>
    <Helmet>
      <title>Order Fills</title>
    </Helmet>
    <PageLayout
      breadcrumbItems={[{ title: 'Order Fills', url: URL.FILLS }]}
      title="Order Fills"
    >
      <Card fullHeight>
        <Fills />
      </Card>
    </PageLayout>
  </>
);

export default FillsPage;
