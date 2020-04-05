import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT } from '../../../constants';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';

const ArticleImage = styled.img`
  border-radius: 0.25rem;
  height: ${(props) => (props.compact ? '50px' : '70px')};
  margin-right: 1rem;
  width: ${(props) => (props.compact ? '50px' : '70px')};
`;

const StyledArticle = styled.div`
  border-bottom: 1px solid ${colors.athensGray};
  display: flex;
  margin: 0 0 1.5rem 0;
  padding: 0 0 1.5rem 0;

  &:last-child {
    border: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const ArticleMetadata = styled.dl`
  color: ${colors.stormGray};
  font-size: 0.9rem;
  margin: 0 0 0.5rem;

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
      width: 0.25rem;
      height: 0.25rem;
      background-color: currentColor;
      display: inline-block;
      vertical-align: middle;
      margin: 0 0.5rem;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;

const ArticleHeading = styled.h4`
  font-size: 1.1rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${(props) => (props.compact ? 'wrap' : 'nowrap')};
`;

const Article = ({ article, compact, showImage }) => (
  <StyledArticle>
    {showImage && article.source.imageUrl ? (
      <Link css="color: currentColor;" href={article.source.url}>
        <ArticleImage alt="" compact={compact} src={article.source.imageUrl} />
      </Link>
    ) : null}
    <div css="display: flex; flex-direction: column; overflow: hidden;">
      <ArticleHeading compact={compact}>
        <Link href={article.url}>{article.title}</Link>
      </ArticleHeading>
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
        <dd>{formatDate(article.date, DATE_FORMAT.RELATIVE)}</dd>
      </ArticleMetadata>
      <p css="flex-grow: 1; margin: 0;">
        {_.truncate(article.summary, { length: compact ? 120 : 150 })}
      </p>
    </div>
  </StyledArticle>
);

Article.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    source: PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
    }).isRequired,
    summary: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  compact: PropTypes.bool,
  showImage: PropTypes.bool,
};

Article.defaultProps = {
  compact: false,
  showImage: true,
};

export default Article;
