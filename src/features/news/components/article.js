import _ from 'lodash';
import { distanceInWordsToNow } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import Link from '../../../components/link';

const images = {
  DDEX:
    'https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-1/p480x480/32583364_400965713756550_7672260622427357184_n.png?_nc_cat=100&_nc_ht=scontent-syd2-1.xx&oh=7f80d101f868b383c90f0cff65590a9e&oe=5C912C27',
  dYdX: 'https://avatars2.githubusercontent.com/u/35151859?s=200&v=4',
  Dharma: 'https://avatars3.githubusercontent.com/u/28667653?s=200&v=4',
  Ethfinex:
    'https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-9/42167315_1873147566139458_8738700426498539520_n.png?_nc_cat=105&_nc_ht=scontent-syd2-1.xx&oh=7d07e8bf62a768b1047f43c2ca48e297&oe=5CC984CD',
  OpenRelay:
    'https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-9/35130792_207620986523084_7859383933673144320_o.jpg?_nc_cat=102&_nc_ht=scontent-syd2-1.xx&oh=75532c9a1297c31968818d36692426b8&oe=5CD230E9',
  '0x Project': 'https://avatars3.githubusercontent.com/u/24832717?s=200&v=4',
  'ERC dEX':
    'https://cdn-images-1.medium.com/max/262/1*Vvtd0gvgLeCrsKipy02Ftg@2x.jpeg',
  'Radar Relay': 'https://avatars1.githubusercontent.com/u/30643433?s=200&v=4',
  'The Ocean':
    'https://cdn1.telesco.pe/file/hRgyk6lLokQnVaIbk6_jPZ44Oyzh62ZXzR1NpdS_Ud6_NIhz-MQL_zzMd7TQKbIdci7LePby7dRHiGis6FU7qhEf_n7wZ9DGMB9dBt5OAksxoA1jGFODzWvj1tFcipewx7U8j5QgiHHSqMeF5ZPwlyMBk-htWFWXlSiz26e1iotBnkWH-4lNLei9EfrvJaMGS-PTw2I2fNAlkyV1HY5h7LZWiMJ7MWtIDLdJ1yjdDY7PKOgBVHodQdgc96NlF44FN8bimJOMJ6_RhQzzQy0pCQeh3b_cxBwAUXmUz8jH_Hm5BFw0vUHDPfkb75xOieE0BXGkL6ZcVGK2Ygl_4YT87Q.jpg',
  Paradex:
    'https://pbs.twimg.com/profile_images/1029076697784537088/64FRlCmG_400x400.jpg',
  LedgerDex:
    'https://pbs.twimg.com/profile_images/1010434218382450688/juR2-S3p_400x400.jpg',
};

const ArticleImage = styled.img`
  border-radius: 3px;
  height: 100px;
  width: 100px;
`;

const ArticleDescription = styled.p`
  flex-grow: 1;
`;

const ArticleBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1em;
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
    <ArticleImage src={images[article.source.name] || images.dYdX} />
    <ArticleBody>
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
      <ArticleDescription>
        {_.truncate(article.summary, { length: 150 })}
      </ArticleDescription>
    </ArticleBody>
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
