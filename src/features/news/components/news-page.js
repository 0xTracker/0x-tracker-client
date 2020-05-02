import _ from 'lodash';
import { useParams } from 'react-router';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import { useMetadata } from '../../../hooks';
import ArticleList from './article-list';
import ArticlesFilter from './articles-filter';
import ArticlesProvider from './articles-provider';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import LoadingIndicator from '../../../components/loading-indicator';
import LoadingPage from '../../../components/loading-page';
import PageLayout from '../../../components/page-layout';
import useArticleSources from '../hooks/use-article-sources';

const LoadMoreButton = styled.button`
  align-items: center;
  background-color: ${COLORS.NEUTRAL.MYSTIC_300};
  border: none;
  border-radius: 0.25rem;
  color: currentColor;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: 1rem;
  padding: 1rem 0;

  &:hover {
    background-color: ${COLORS.NEUTRAL.MYSTIC_400};
  }
`;

const NewsPage = () => {
  useMetadata({ title: '0x Ecosystem News & Updates' });

  const params = useParams();
  const [sources, loadingSources] = useArticleSources();
  const breakpoint = useCurrentBreakpoint();

  if (loadingSources) {
    return <LoadingPage />;
  }

  const source = _.find(sources, { slug: params.source });

  return (
    <PageLayout
      title={source ? `${source.name} News & Updates` : 'News & Updates'}
    >
      <CardGrid>
        <CardGridRow md={8}>
          <CardGridCol>
            <Card>
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
          </CardGridCol>
          <CardGridCol md={4}>
            <Card>
              <CardHeader>
                <CardHeading>Filter by source</CardHeading>
              </CardHeader>
              <ArticlesFilter sources={sources} />
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default NewsPage;
