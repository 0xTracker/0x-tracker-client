import _ from 'lodash';
import { distanceInWordsToNow } from 'date-fns';
import { Card, CardBody, CardText, CardSubtitle, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from '../../../components/link';

const ArticleDescription = styled(CardText)`
  flex-grow: 1;
`;

const ArticleSource = styled(CardSubtitle).attrs({ className: 'text-muted' })`
  margin-bottom: 0.5rem;
`;

const ArticleBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
`;

const Article = ({ article }) => (
  <Card>
    <ArticleBody>
      <CardTitle tag="h4">
        <Link href={article.url}>{article.title}</Link>
      </CardTitle>
      <ArticleSource>
        {_.isString(article.source.url) ? (
          <Link href={article.source.url}>{article.source.name}</Link>
        ) : (
          article.source.name
        )}
      </ArticleSource>
      <ArticleDescription>
        {_.truncate(article.summary, { length: 170 })}
      </ArticleDescription>
      <CardText>
        <small className="text-muted">
          Posted {distanceInWordsToNow(article.date)} ago
        </small>
      </CardText>
    </ArticleBody>
  </Card>
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
