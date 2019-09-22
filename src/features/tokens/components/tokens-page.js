import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import Card from '../../../components/card';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import TimePeriodSelector from '../../../components/time-period-selector';
import TokenList from './token-list';
import useTokens from '../hooks/use-tokens';
import withPagination from '../../../components/with-pagination';

const TokensPage = ({ history, location, page, setPage }) => {
  const params = new URLSearchParams(location.search);
  const statsPeriod = params.get('statsPeriod') || TIME_PERIOD.DAY;

  const [tokens, loadingTokens] = useTokens({
    autoReload: true,
    limit: 50,
    page,
    statsPeriod,
  });

  const { items, pageCount, pageSize, recordCount } = tokens;

  return (
    <>
      <Helmet>
        <title>Traded Tokens</title>
      </Helmet>
      <PageLayout
        filter={
          <TimePeriodSelector
            css="width: 100%;"
            onChange={newPeriod => {
              history.push(
                `${URL.TOKENS}?page=${page}&statsPeriod=${newPeriod}`,
              );
            }}
            value={statsPeriod}
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
