import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { media } from '../../../styles/util';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import ArticleList from './article-list';
import ArticlesFilter from './articles-filter';
import ArticlesProvider from './articles-provider';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import LoadingIndicator from '../../../components/loading-indicator';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import useArticleSources from '../hooks/use-article-sources';

const LoadMoreButton = styled.button`
  align-items: center;
  background-color: ${colors.athensGrayer};
  border: none;
  border-radius: 0.25rem;
  color: currentColor;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 1rem;
  padding: 1rem 0;

  &:hover {
    background-color: ${colors.mystic};
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

const NewsPage = ({ match }) => {
  const [sources, loadingSources] = useArticleSources();
  const breakpoint = useCurrentBreakpoint();

  if (loadingSources) {
    return <LoadingPage />;
  }

  const source = _.find(sources, { slug: match.params.source });

  return (
    <PageLayout
      title={source ? `${source.name} News & Updates` : 'News & Updates'}
    >
      <Helmet>
        <title>News &amp; Updates</title>
      </Helmet>
      <Row css="flex-grow: 1;">
        <ArticlesColumn>
          <Card fullHeight>
            <CardBody>
              <ArticlesProvider
                limit={11}
                source={source ? source.slug : undefined}
              >
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
                        compact={breakpoint.equalTo('xs')}
                        showImages={!breakpoint.equalTo('xs')}
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
            </CardBody>
          </Card>
        </ArticlesColumn>
        <Col md={4}>
          <Card>
            <CardHeader>
              <CardHeading>Filter by source</CardHeading>
            </CardHeader>
            <ArticlesFilter sources={sources} />
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

NewsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      source: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default NewsPage;
