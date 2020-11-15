import React from 'react';
import styled from 'styled-components';

import { DATE_FORMAT, URL } from '../../../constants';
import ArticlesProvider from './articles-provider';
import LoadingIndicator from '../../../components/loading-indicator';
import EntityList from '../../../components/entity-list';
import EntityListItem from '../../../components/entity-list-item';
import { formatDate } from '../../../util';

const getArticleUrl = (article) =>
  article.source.slug === '0x-tracker'
    ? `${URL.NEWS}/${article.source.slug}/${article.slug}`
    : article.url;

const ArticleImage = styled.img`
  border-radius: 0.25rem;
  height: 40px;
  width: 40px;
`;

const LatestNews = () => (
  <ArticlesProvider limit={8}>
    {({ articles, loadingInitial }) =>
      loadingInitial ? (
        <LoadingIndicator centered />
      ) : (
        <EntityList>
          {articles.map((article) => (
            <EntityListItem
              image={<ArticleImage alt="" src={article.source.imageUrl} />}
              key={article.id}
              metadata={[
                {
                  label: 'Source',
                  value: article.source.name,
                },
                {
                  label: 'Date',
                  value: formatDate(article.date, DATE_FORMAT.RELATIVE),
                },
              ]}
              title={article.title}
              url={getArticleUrl(article)}
            />
          ))}
        </EntityList>
      )
    }
  </ArticlesProvider>
);

export default LatestNews;
