import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import AssetBridgeList from './asset-bridge-list';
import AssetBridgingMetrics from './asset-bridging-metrics';
import AssetBridgingStats from './asset-bridging-stats';
import Card from '../../../components/card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import LoadingIndicator from '../../../components/loading-indicator';
import PageLayout from '../../../components/page-layout';
import Paginator from '../../../components/paginator';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import SubTitle from '../../../components/sub-title';
import TabbedCard from '../../../components/tabbed-card';
import useAssetBridges from '../hooks/use-asset-bridges';
import HelpWidget from '../../../components/help-widget';

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'from the past 24 hours',
  [TIME_PERIOD.WEEK]: 'from the past week',
  [TIME_PERIOD.MONTH]: 'from the past 30 days',
  [TIME_PERIOD.YEAR]: 'from the past year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const AssetBridgesPage = () => {
  useMetadata({ title: '0x Protocol Asset Bridge Metrics & Charts' });

  const { navigateTo } = useNavigator();
  const { page, setPage } = usePaginator();
  const statsPeriod = useSearchParam('statsPeriod', TIME_PERIOD.MONTH);

  const [assetBridges, loadingAssetBridges] = useAssetBridges({
    autoReload: true,
    limit: 25,
    page,
    statsPeriod,
  });

  const { items, pageCount, pageSize, recordCount } = assetBridges;

  return (
    <PageLayout
      filter={
        <ResponsiveTimePeriodFilter
          name="statsPeriod"
          onChange={(newPeriod) => {
            navigateTo(URL.ASSET_BRIDGES, { statsPeriod: newPeriod });
          }}
          value={statsPeriod}
        />
      }
      title={
        <>
          <span css="display: flex; align-items: center;">
            Asset Bridges{' '}
            <HelpWidget css="margin-left: 0.5rem;">
              Asset bridges allow 0x to tap into on-chain liquidity sources like
              Kyber and Uniswap by sourcing maker liquidity from contracts
              rather than wallets. This page provides an overview of briding
              contract activity for a given period of time.
            </HelpWidget>
          </span>
          <SubTitle>{periodDescriptions[statsPeriod]}</SubTitle>
        </>
      }
    >
      <CardGrid>
        <AssetBridgingStats bridgeCount={recordCount} period={statsPeriod} />
        <CardGridRow>
          <CardGridCol xs={12}>
            <TabbedCard
              tabs={[
                {
                  component: (
                    <AssetBridgingMetrics
                      period={statsPeriod}
                      type="tradeVolume"
                    />
                  ),
                  title: 'Volume',
                },
                {
                  component: (
                    <AssetBridgingMetrics
                      period={statsPeriod}
                      type="tradeCount"
                    />
                  ),
                  title: 'Trades',
                },
              ]}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol xs={12}>
            <Card>
              {loadingAssetBridges ? (
                <LoadingIndicator centered />
              ) : (
                <>
                  <AssetBridgeList
                    assetBridges={items}
                    positionOffset={(page - 1) * pageSize}
                    statsPeriod={statsPeriod}
                  />
                  <Paginator
                    onPageChange={setPage}
                    page={page}
                    pageCount={pageCount}
                    pageSize={pageSize}
                    recordCount={recordCount}
                  />
                </>
              )}
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default AssetBridgesPage;
