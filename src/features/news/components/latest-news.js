import PropTypes from 'prop-types';
import React from 'react';

import ArticleList from './article-list';
import ArticlesProvider from './articles-provider';
import LoadingIndicator from '../../../components/loading-indicator';

const LatestNews = ({ compact, showImages }) => (
  <ArticlesProvider limit={4}>
    {({ articles, loadingInitial }) =>
      loadingInitial ? (
        <LoadingIndicator centered />
      ) : (
        <>
          <ArticleList
            articles={articles}
            compact={compact}
            showImages={showImages}
          />
        </>
      )
    }
  </ArticlesProvider>
);

LatestNews.propTypes = {
  compact: PropTypes.bool,
  showImages: PropTypes.bool,
};

LatestNews.defaultProps = {
  compact: undefined,
  showImages: undefined,
};

export default LatestNews;
