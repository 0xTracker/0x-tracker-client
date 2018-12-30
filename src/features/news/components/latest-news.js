import React from 'react';

import ArticleList from './article-list';
import ArticlesProvider from './articles-provider';
import LoadingIndicator from '../../../components/loading-indicator';

const LatestNews = () => (
  <ArticlesProvider limit={4}>
    {({ articles, loadingInitial }) =>
      loadingInitial ? (
        <LoadingIndicator centered />
      ) : (
        <React.Fragment>
          <ArticleList articles={articles} compact />
        </React.Fragment>
      )
    }
  </ArticlesProvider>
);

export default LatestNews;
