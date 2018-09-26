import _ from 'lodash';
import { distanceInWordsToNow } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../../components/link';

const Article = ({ article }) => (
  <div className="card">
    <div
      className="card-body"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <h4 className="card-title">
        <Link href={article.url}>{article.title}</Link>
      </h4>
      <h6 className="card-subtitle mb-2 text-muted">
        {_.isString(article.source.url) ? (
          <Link href={article.source.url}>{article.source.name}</Link>
        ) : (
          article.source.name
        )}
      </h6>
      <p className="card-text" style={{ flexGrow: 1 }}>
        {_.truncate(article.summary, { length: 170 })}
      </p>
      <p className="card-text">
        <small className="text-muted">
          Posted {distanceInWordsToNow(article.date)} ago
        </small>
      </p>
    </div>
  </div>
);

Article.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    source: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
    }).isRequired,
    summary: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
