import React from 'react';

import { URL } from '../../../constants';
import ArticleList from './article-list';
import ContentHeader from '../../../components/content-header';
import ContentSection from '../../../components/content-section';

const NewsPage = () => [
  <ContentHeader
    breadcrumbItems={[{ title: 'News & Updates', url: URL.NEWS }]}
    key="page-heading"
    title="News & Updates"
  />,
  <ContentSection key="content">
    <ArticleList />
  </ContentSection>,
];

export default NewsPage;
