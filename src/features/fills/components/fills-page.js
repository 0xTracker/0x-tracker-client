import React from 'react';

import { URL } from '../../../constants';
import ContentHeader from '../../../components/content-header';
import ContentSection from '../../../components/content-section';
import Fills from './fills';

const FillsPage = () => [
  <ContentHeader
    breadcrumbItems={[{ title: 'Recent Fills', url: URL.FILLS }]}
    key="page-heading"
    title="Recent Fills"
  />,
  <ContentSection key="content">
    <Fills />
  </ContentSection>,
];

export default FillsPage;
