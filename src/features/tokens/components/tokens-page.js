import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD, URL } from '../../../constants';
import { useNavigator, usePaginator, useSearchParam } from '../../../hooks';
import LoadingIndicator from '../../../components/loading-indicator';
import TokenList from './token-list';
import TokensPageLayout from './tokens-page-layout';
import useTokens from '../hooks/use-tokens';

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

const TokensPage = () => {
  const { page, setPage } = usePaginator();
  const { navigateTo } = useNavigator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.DAY);
  const type = useSearchParam('type');
  const selectedFilters = { statsPeriod, type };

  const [tokens, loadingTokens] = useTokens({
    autoReload: true,
    limit: 25,
    page,
    statsPeriod,
    type,
  });

  const { items, pageCount, pageSize, recordCount } = tokens;

  const handleFiltersChange = (newFilters) => {
    navigateTo(URL.TOKENS, newFilters);
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
        statsPeriod={statsPeriod}
        tokens={items}
      />
    </TokensPageLayout>
  );
};

export default TokensPage;
