import _ from 'lodash';
import { distanceInWordsToNow } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Link from '../../../components/link';

const ArticleImage = styled.img`
  border-radius: 3px;
  height: 100px;
  margin-right: 1em;
  width: 100px;
`;

const StyledArticle = styled.div`
  border-bottom: 1px solid ${colors.athensGray};
  display: flex;
  margin: 0 0 1.5em 0;
  padding: 0 0 1.5em 0;

  &:last-child {
    border: none;
    margin-bottom: 0;
  }
`;

const ArticleMetadata = styled.dl`
  color: ${colors.stormGray};
  font-size: 0.9em;
  margin: 0 0 0.5em;

  dt {
    display: none;
  }

  dd {
    display: inline-block;
    margin: 0;
    vertical-align: middle;

    &::after {
      content: '';
      border-radius: 50%;
      width: 5px;
      height: 5px;
      background-color: currentColor;
      display: inline-block;
      vertical-align: middle;
      margin: 0 0.5em;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;

const Article = ({ article }) => (
  <StyledArticle>
    {article.source.imageUrl ? (
      <ArticleImage alt="" src={article.source.imageUrl} />
    ) : null}
    <div css="display: flex; flex-direction: column;">
      <h4 css="font-size: 1.2em; margin: 0;">
        <Link href={article.url}>{article.title}</Link>
      </h4>
      <ArticleMetadata>
        <dt>Source</dt>
        <dd>
          {_.isString(article.source.url) ? (
            <Link css="color: currentColor;" href={article.source.url}>
              {article.source.name}
            </Link>
          ) : (
            article.source.name
          )}
        </dd>
        <dt>Date</dt>
        <dd>{distanceInWordsToNow(article.date)} ago</dd>
      </ArticleMetadata>
      <p css="flex-grow: 1; margin: 0;">
        {_.truncate(article.summary, { length: 150 })}
      </p>
    </div>
  </StyledArticle>
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
