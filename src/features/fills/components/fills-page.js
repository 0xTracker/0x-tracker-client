import React from 'react';

import { useMetadata, usePaginator, useSearchParam } from '../../../hooks';
import Card from '../../../components/card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import CardPlaceholder from '../../../components/card-placeholder';
import Fills from './fills';
import FillsBrowserStats from './fills-browser-stats';
import FillsPageLayout from './fills-page-layout';
import LoadingIndicator from '../../../components/loading-indicator';
import NetworkMetrics from '../../metrics/components/network-metrics';
import NetworkVolume from '../../metrics/components/network-volume';
import TabbedCard from '../../../components/tabbed-card';
import useNetworkStats from '../../stats/hooks/use-network-stats';

const FillsPage = () => {
  useMetadata({ title: 'Browse 0x Protocol Trades' });

  const { page, setPage } = usePaginator();
  const status = useSearchParam('status');
  const dateFrom = useSearchParam('dateFrom');
  const dateTo = useSearchParam('dateTo');
  const protocolVersion = useSearchParam('protocolVersion');
  const token = useSearchParam('token');
  const trader = useSearchParam('trader');
  const relayer = useSearchParam('relayer');
  const valueFrom = useSearchParam('valueFrom');
  const valueTo = useSearchParam('valueTo');

  const selectedFilters = {
    protocolVersion,
    relayer,
    status,
    token,
    trader,
    valueFrom,
    valueTo,
  };

  const period =
    dateFrom === undefined && dateTo === undefined
      ? 'all'
      : { from: dateFrom, to: dateTo };

  const [networkStats, loadingNetworkStats] = useNetworkStats({
    filters: selectedFilters,
    period,
  });

  if (loadingNetworkStats) {
    return (
      <FillsPageLayout period={period} selectedFilters={selectedFilters}>
        <CardGrid>
          <CardGridRow>
            <CardGridCol>
              <Card>
                <LoadingIndicator centered />
              </Card>
            </CardGridCol>
          </CardGridRow>
        </CardGrid>
      </FillsPageLayout>
    );
  }

  if (networkStats.tradeCount === 0) {
    return (
      <FillsPageLayout period={period} selectedFilters={selectedFilters}>
        <CardGrid>
          <CardGridRow>
            <CardGridCol>
              <Card>
                <CardPlaceholder>
                  No trades were found matching the selected filters
                </CardPlaceholder>
              </Card>
            </CardGridCol>
          </CardGridRow>
        </CardGrid>
      </FillsPageLayout>
    );
  }

  return (
    <FillsPageLayout period={period} selectedFilters={selectedFilters}>
      <CardGrid>
        <FillsBrowserStats
          filters={selectedFilters}
          networkStats={networkStats}
          period={period}
        />
        <CardGridRow>
          <CardGridCol>
            <TabbedCard
              tabs={[
                {
                  component: (
                    <NetworkVolume
                      filters={selectedFilters}
                      period={period}
                      type="tradeVolume"
                    />
                  ),
                  title: 'Volume',
                },
                {
                  component: (
                    <NetworkVolume
                      filters={selectedFilters}
                      period={period}
                      type="tradeCount"
                    />
                  ),
                  title: 'Trades',
                },
                {
                  component: (
                    <NetworkMetrics
                      filters={selectedFilters}
                      period={period}
                      type="protocolFees"
                    />
                  ),
                  title: 'Protocol Fees',
                },
              ]}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol>
            <Card>
              <Fills
                filter={{ ...selectedFilters, dateFrom, dateTo }}
                onPageChange={setPage}
                page={page}
              />
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </FillsPageLayout>
  );
};

export default FillsPage;
