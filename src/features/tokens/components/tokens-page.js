import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD, URL } from '../../../constants';
import LoadingIndicator from '../../../components/loading-indicator';
import TokenList from './token-list';
import useTokens from '../hooks/use-tokens';
import withPagination from '../../../components/with-pagination';
import buildUrl from '../../../util/build-url';
import TokensPageLayout from './tokens-page-layout';

const defaultFilters = {
  statsPeriod: TIME_PERIOD.DAY,
  type: undefined,
};

const NoResults = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-shrink: 1;
  padding: 2rem;
`;

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

  const handleFiltersChange = (newFilters) => {
    history.push(buildUrl(URL.TOKENS, newFilters));
  };

  const layoutProps = {
    defaultFilters,
    onFiltersChange: handleFiltersChange,
    selectedFilters,
  };

  if (loadingTokens) {
    return (
      <TokensPageLayout {...layoutProps}>
        <LoadingIndicator centered />
      </TokensPageLayout>
    );
  }

  if (items.length === 0) {
    return (
      <TokensPageLayout {...layoutProps}>
        <NoResults>
          <p css="font-size: 1.3rem; text-align: center; word-break: break-word;">
            No tokens found matching the selected filter
          </p>
        </NoResults>
      </TokensPageLayout>
    );
  }

  return (
    <TokensPageLayout {...layoutProps}>
      <TokenList
        onPageChange={setPage}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        recordCount={recordCount}
        tokens={items}
      />
    </TokensPageLayout>
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
