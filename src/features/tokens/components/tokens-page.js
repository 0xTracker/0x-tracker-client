import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD, URL } from '../../../constants';
import { useNavigator, usePaginator, useSearchParam } from '../../../hooks';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import LoadingIndicator from '../../../components/loading-indicator';
import TokenList from './token-list';
import TokensPageLayout from './tokens-page-layout';
import useTokens from '../hooks/use-tokens';
import TradedTokenMetrics from '../../traders/components/traded-token-metrics';
import HelpWidget from '../../../components/help-widget';

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
    if (window.fathom) {
      window.fathom.trackGoal('YQQLGWQC', 0);
    }

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
        <Card>
          <LoadingIndicator centered />
        </Card>
      </TokensPageLayout>
    );
  }

  if (items.length === 0) {
    return (
      <TokensPageLayout {...layoutProps}>
        <Card>
          <NoResults>
            <p css="font-size: 1.3rem; text-align: center; word-break: break-word;">
              No tokens found matching the selected filter
            </p>
          </NoResults>
        </Card>
      </TokensPageLayout>
    );
  }

  return (
    <TokensPageLayout {...layoutProps}>
      <CardGrid>
        <CardGridRow minHeight="330px">
          <CardGridCol>
            <Card>
              <CardHeader>
                <CardHeading>
                  Trend
                  <HelpWidget css="margin-left: 8px;">
                    Number of unique traded tokens over time in the selected
                    period.
                  </HelpWidget>
                </CardHeading>
              </CardHeader>
              <CardBody padded>
                <TradedTokenMetrics period={statsPeriod} />
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol>
            <Card>
              <TokenList
                onPageChange={setPage}
                page={page}
                pageCount={pageCount}
                pageSize={pageSize}
                recordCount={recordCount}
                statsPeriod={statsPeriod}
                tokens={items}
              />
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </TokensPageLayout>
  );
};

export default TokensPage;
