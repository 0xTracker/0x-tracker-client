import { Col, Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import { colors } from '../../../styles/constants';
import ArticleList from './article-list';
import ArticlesProvider from './articles-provider';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';

const LoadMoreButton = styled.button`
  align-items: center;
  background-color: ${colors.athensGray};
  border: none;
  border-radius: 3px;
  color: currentColor;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 1em 0;

  &:hover {
    background-color: ${colors.mischka};
  }
`;

const NewsPage = () => (
  <PageLayout
    breadcrumbItems={[{ title: 'News & Updates', url: URL.NEWS }]}
    title="News & Updates"
  >
    <Row css="height: 100%;">
      <Col css="height: 100%;" md={8}>
        <Card css="height: 100%; padding: 16px;">
          <ArticlesProvider>
            {({
              articles,
              canLoadMore,
              loadingInitial,
              loadingMore,
              loadMore,
            }) =>
              loadingInitial ? (
                <LoadingIndicator centered />
              ) : (
                <React.Fragment>
                  <ArticleList articles={articles} />
                  {canLoadMore ? (
                    <LoadMoreButton onClick={loadMore}>
                      {loadingMore ? (
                        <LoadingIndicator size="small" type="cylon" />
                      ) : (
                        'Load More Stories'
                      )}
                    </LoadMoreButton>
                  ) : null}
                </React.Fragment>
              )
            }
          </ArticlesProvider>
        </Card>
      </Col>
      <Col md={4}>
        <Card css="padding: 32px;">TODO: Add source filters</Card>
      </Col>
    </Row>
  </PageLayout>
);

export default NewsPage;
