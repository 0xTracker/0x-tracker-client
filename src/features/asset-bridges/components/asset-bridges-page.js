import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import { AssetBridgeIcon } from '../../../components/icons';
import AssetBridgingMetrics from './asset-bridging-metrics';
import AssetBridgingStats from './asset-bridging-stats';
import Card from '../../../components/card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import PageLayout from '../../../components/page-layout';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';
import HelpWidget from '../../../components/help-widget';
import AssetBridges from './asset-bridges';

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

  return (
    <PageLayout
      actions={
        <ResponsiveTimePeriodFilter
          name="statsPeriod"
          onChange={(newPeriod) => {
            navigateTo(URL.ASSET_BRIDGES, { statsPeriod: newPeriod });
          }}
          value={statsPeriod}
        />
      }
      icon={<AssetBridgeIcon size={44} />}
      subTitle={periodDescriptions[statsPeriod]}
      title={
        <span css="display: flex; align-items: center;">
          Asset Bridges{' '}
          <HelpWidget css="margin-left: 0.5rem;">
            Asset bridges allow 0x to tap into on-chain liquidity sources like
            Kyber and Uniswap by sourcing maker liquidity from contracts rather
            than wallets. This page provides an overview of briding contract
            activity for a given period of time.
          </HelpWidget>
        </span>
      }
    >
      <CardGrid>
        <AssetBridgingStats period={statsPeriod} />
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
              <AssetBridges
                onPageChange={setPage}
                page={page}
                statsPeriod={statsPeriod}
              />
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default AssetBridgesPage;
