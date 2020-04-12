import React from 'react';

import Article from './article';

const ArticleList = ({ articles, compact, showImages }) =>
  articles.map((article, index) => (
    <Article
      article={article}
      compact={compact}
      index={index}
      key={article.id}
      showImage={showImages}
    />
  ));

export default ArticleList;
