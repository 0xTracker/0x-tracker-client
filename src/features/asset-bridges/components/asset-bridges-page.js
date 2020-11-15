import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import {
  useMetadata,
  useNavigator,
  usePaginator,
  useSearchParam,
} from '../../../hooks';
import { AssetBridgeIcon } from '../../../components/icons';
import { getPeriodDescriptor } from '../../../util';
import AssetBridgingMetrics from './asset-bridging-metrics';
import AssetBridgingStats from './asset-bridging-stats';
import AssetBridges from './asset-bridges';
import Card from '../../../components/card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import HelpWidget from '../../../components/help-widget';
import PageLayout from '../../../components/page-layout';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';

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
      subTitle={getPeriodDescriptor(statsPeriod)}
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
        <CardGridRow minHeight="360px">
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
