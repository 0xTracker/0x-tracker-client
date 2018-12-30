import React from 'react';

import Article from './article';

const ArticleList = ({ articles }) =>
  articles.map(article => <Article article={article} key={article.id} />);

export default ArticleList;
