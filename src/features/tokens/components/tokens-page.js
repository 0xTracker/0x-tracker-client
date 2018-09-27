import _ from 'lodash';
import { compose, withProps } from 'recompose';
import React from 'react';
import qs from 'qs';

import { URL } from '../../../constants';
import ContentHeader from '../../../components/content-header';
import ContentSection from '../../../components/content-section';
import TokenList from './token-list';

const PAGE_SIZE = 50;

const TokensPage = ({ history, page }) => [
  <ContentHeader
    breadcrumbItems={[{ title: 'Tokens', url: URL.TOKENS }]}
    key="page-heading"
    title="Traded Tokens"
  />,
  <ContentSection key="content">
    <TokenList history={history} limit={PAGE_SIZE} page={page} />
  </ContentSection>,
];

const enhance = compose(
  withProps(({ location }) => ({
    querystring: qs.parse(location.search.substring(1)),
  })),
  withProps(({ querystring }) => ({
    page: _.toNumber(querystring.page) || 1,
  })),
);

export default enhance(TokensPage);
