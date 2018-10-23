import React from 'react';

import { URL } from '../../../constants';
import ArticleList from './article-list';
import PageLayout from '../../../components/page-layout';

const NewsPage = () => (
  <PageLayout
    breadcrumbItems={[{ title: 'News & Updates', url: URL.NEWS }]}
    title="News & Updates"
  >
    <ArticleList />
  </PageLayout>
);

export default NewsPage;
