import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import TokensFilter from './tokens-filter';
import TokenList from './token-list';
import useTokens from '../hooks/use-tokens';
import withPagination from '../../../components/with-pagination';
import buildUrl from '../../../util/build-url';

const defaultFilters = {
  statsPeriod: TIME_PERIOD.DAY,
  type: undefined,
};

const TokensPage = ({ history, location, page, setPage }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || TIME_PERIOD.DAY;
  const type = params.get('type') || undefined;
  const selectedFilters = { statsPeriod, type };

  const [tokens, loadingTokens] = useTokens({
    autoReload: true,
    limit: 50,
    page,
    statsPeriod,
    type,
  });

  const { items, pageCount, pageSize, recordCount } = tokens;

  return (
    <>
      <Helmet>
        <title>Traded Tokens</title>
      </Helmet>
      <PageLayout
        filter={
          <TokensFilter
            defaultFilters={defaultFilters}
            onChange={newFilters => {
              history.push(buildUrl(URL.TOKENS, newFilters));
            }}
            selectedFilters={selectedFilters}
          />
        }
        title="Traded Tokens"
      >
        <Card fullHeight>
          {loadingTokens ? (
            <LoadingIndicator centered />
          ) : (
            <TokenList
              onPageChange={setPage}
              page={page}
              pageCount={pageCount}
              pageSize={pageSize}
              recordCount={recordCount}
              tokens={items}
            />
          )}
        </Card>
      </PageLayout>
    </>
  );
};

TokensPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default withPagination(TokensPage);
