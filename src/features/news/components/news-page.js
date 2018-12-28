import { Col, Row } from 'reactstrap';
import React from 'react';

import { URL } from '../../../constants';
import ArticleList from './article-list';
import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';

const NewsPage = () => (
  <PageLayout
    breadcrumbItems={[{ title: 'News & Updates', url: URL.NEWS }]}
    title="News & Updates"
  >
    <Row css="height: 100%;">
      <Col css="height: 100%;" md={8}>
        <Card css="height: 100%; padding: 16px;">
          <ArticleList />
        </Card>
      </Col>
      <Col md={4}>
        <Card css="padding: 32px;" />
      </Col>
    </Row>
  </PageLayout>
);

export default NewsPage;
