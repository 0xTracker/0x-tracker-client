import React from 'react';

import Article from './article';

const ArticleList = ({ articles, compact }) =>
  articles.map(article => (
    <Article article={article} compact={compact} key={article.id} />
  ));

export default ArticleList;
