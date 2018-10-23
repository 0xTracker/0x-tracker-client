import React from 'react';

import { URL } from '../../../constants';
import Fills from './fills';
import PageLayout from '../../../components/page-layout';

const FillsPage = () => (
  <PageLayout
    breadcrumbItems={[{ title: 'Recent Fills', url: URL.FILLS }]}
    title="Recent Fills"
  >
    <Fills />
  </PageLayout>
);

export default FillsPage;
