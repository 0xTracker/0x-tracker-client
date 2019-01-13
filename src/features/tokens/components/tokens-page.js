import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';

import { URL } from '../../../constants';
import Card from '../../../components/card';
import PageLayout from '../../../components/page-layout';
import TokenList from './token-list';

const PAGE_SIZE = 50;

const TokensPage = ({ history, page, screenSize }) => {
  const pagesToDisplay = screenSize.greaterThan.sm ? 5 : 3;

  return (
    <PageLayout
      breadcrumbItems={[{ title: 'Tokens', url: URL.TOKENS }]}
      title="Traded Tokens"
    >
      <Card fullHeight>
        <TokenList
          history={history}
          limit={PAGE_SIZE}
          page={page}
          pagesToDisplay={pagesToDisplay}
        />
      </Card>
    </PageLayout>
  );
};

TokensPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  page: PropTypes.number.isRequired,
  screenSize: PropTypes.object.isRequired,
};

const enhance = compose(
  withProps(({ location }) => ({
    querystring: qs.parse(location.search.substring(1)),
  })),
  withProps(({ querystring }) => ({
    page: _.toNumber(querystring.page) || 1,
  })),
  connect(state => ({ screenSize: state.screen })),
);

export default enhance(TokensPage);
