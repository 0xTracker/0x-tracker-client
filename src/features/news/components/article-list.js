import React from 'react';

import Article from './article';

const ArticleList = ({ articles, compact, showImages }) =>
  articles.map(article => (
    <Article
      article={article}
      compact={compact}
      key={article.id}
      showImage={showImages}
    />
  ));

export default ArticleList;
