import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import { colors } from '../../../styles/constants';
import { media } from '../../../styles/util';
import ArticleList from './article-list';
import ArticlesProvider from './articles-provider';
import Card from '../../../components/card';
import CardHeading from '../../../components/card-heading';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import ArticlesFilter from './articles-filter';

const LoadMoreButton = styled.button`
  align-items: center;
  background-color: ${colors.athensGray};
  border: none;
  border-radius: 0.25rem;
  color: currentColor;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  width: 100%;

  &:hover {
    background-color: ${colors.mischka};
  }
`;

const ArticlesColumn = styled(Col).attrs({ md: 8 })`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  ${media.greaterThan('md')`
    margin-bottom: 0;
  `}
`;

const NewsPage = ({
  match: {
    params: { source },
  },
  screenSize,
}) => (
  <PageLayout
    breadcrumbItems={[{ title: 'News & Updates', url: URL.NEWS }]}
    title="News & Updates"
  >
    <Row css="flex-grow: 1;">
      <ArticlesColumn>
        <Card fullHeight padded>
          <ArticlesProvider source={source}>
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
                  <ArticleList
                    articles={articles}
                    compact={screenSize.lessThan.sm}
                    showImages={screenSize.greaterThan.xs}
                  />
                  {canLoadMore ? (
                    <LoadMoreButton onClick={loadMore} type="button">
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
      </ArticlesColumn>
      <Col md={4}>
        <Card header={<CardHeading>Filter by source</CardHeading>}>
          <ArticlesFilter />
        </Card>
      </Col>
    </Row>
  </PageLayout>
);

NewsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      source: PropTypes.string,
    }).isRequired,
  }).isRequired,
  screenSize: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  screenSize: state.screen,
});

export default connect(mapStateToProps)(NewsPage);
