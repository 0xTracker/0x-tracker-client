import _ from 'lodash';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { URL } from '../../../constants';
import { colors } from '../../../styles/constants';
import { media } from '../../../styles/util';
import ArticleList from './article-list';
import ArticleSourcesProvider from './article-sources-provider';
import ArticlesFilter from './articles-filter';
import ArticlesProvider from './articles-provider';
import Card from '../../../components/card';
import CardHeading from '../../../components/card-heading';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';

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

const NewsPage = ({ loadingSources, match, screenSize, sources }) => {
  const source = _.find(sources, { slug: match.params.source });

  return (
    <>
      <Helmet>
        <title>News &amp; Updates</title>
      </Helmet>
      {loadingSources ? (
        <LoadingIndicator centered />
      ) : (
        <PageLayout
          breadcrumbItems={_.compact([
            { title: 'News & Updates', url: URL.NEWS },
            source && {
              title: source.name,
            },
          ])}
          title={source ? `${source.name} News & Updates` : 'News & Updates'}
        >
          <Row css="flex-grow: 1;">
            <ArticlesColumn>
              <Card fullHeight padded>
                <ArticlesProvider source={source ? source.slug : undefined}>
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
                      <>
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
                      </>
                    )
                  }
                </ArticlesProvider>
              </Card>
            </ArticlesColumn>
            <Col md={4}>
              <Card header={<CardHeading>Filter by source</CardHeading>}>
                <ArticlesFilter sources={sources} />
              </Card>
            </Col>
          </Row>
        </PageLayout>
      )}
    </>
  );
};

NewsPage.propTypes = {
  loadingSources: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      source: PropTypes.string,
    }).isRequired,
  }).isRequired,
  screenSize: PropTypes.object.isRequired,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  ),
};

NewsPage.defaultProps = {
  sources: undefined,
};

const mapStateToProps = state => ({
  screenSize: state.screen,
});

export default connect(mapStateToProps)(props => (
  <ArticleSourcesProvider>
    {({ loading, sources }) => (
      <NewsPage {...props} loadingSources={loading} sources={sources} />
    )}
  </ArticleSourcesProvider>
));
