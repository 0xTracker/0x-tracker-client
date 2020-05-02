import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import { useMetadata } from '../../../hooks';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import ChartsContainer from '../../../components/charts-container';
import HomePageMetrics from './home-page-metrics';
import HomePageTopRelayersFooter from './home-page-top-relayers-footer';
import HomePageTopTokensFooter from './home-page-top-tokens-footer';
import getPeriodOptions from '../../../util/get-period-options';
import LatestNewsCard from '../../news/components/latest-news-card';
import NetworkMetrics from '../../metrics/components/network-metrics';
import PageLayout from '../../../components/page-layout';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import SubscribePanel from '../../../components/subscribe-panel';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';

const HomePage = () => {
  useMetadata({
    title: '0x Protocol Metrics, News & Trading Activity',
  });

  const breakpoint = useCurrentBreakpoint();

  return (
    <>
      <PageLayout>
        <CardGrid>
          <HomePageMetrics minHeight="80px" />
          <CardGridRow>
            <CardGridCol lg={7}>
              <ChartsContainer
                autoHeight
                charts={[
                  {
                    component: <NetworkMetrics type="tradeVolume" />,
                    title: 'Volume',
                  },
                  {
                    component: <NetworkMetrics type="tradeCount" />,
                    title: 'Trades',
                  },
                ]}
                defaultPeriod={TIME_PERIOD.YEAR}
                periods={getPeriodOptions([
                  TIME_PERIOD.DAY,
                  TIME_PERIOD.WEEK,
                  TIME_PERIOD.MONTH,
                  TIME_PERIOD.YEAR,
                  TIME_PERIOD.ALL,
                ])}
              />
            </CardGridCol>
            <CardGridCol lg={5}>
              <ChartsContainer
                autoHeight
                charts={[
                  {
                    component: TopTokens,
                    footer: HomePageTopTokensFooter,
                    title: 'Top Tokens',
                  },
                  {
                    component: TopRelayers,
                    footer: HomePageTopRelayersFooter,
                    title: 'Top Relayers',
                  },
                ]}
                defaultPeriod={TIME_PERIOD.WEEK}
                periods={getPeriodOptions([
                  TIME_PERIOD.DAY,
                  TIME_PERIOD.WEEK,
                  TIME_PERIOD.MONTH,
                ])}
              />
            </CardGridCol>
          </CardGridRow>
          <CardGridRow>
            <CardGridCol lg={7}>
              <RecentFillsCard autoHeight />
            </CardGridCol>
            <CardGridCol lg={5}>
              <LatestNewsCard
                autoHeight
                compact={
                  breakpoint.lessThan('sm') || breakpoint.greaterThan('md')
                }
                showImages={breakpoint.greaterThan('xs')}
              />
            </CardGridCol>
          </CardGridRow>
        </CardGrid>
      </PageLayout>
      <SubscribePanel />
    </>
  );
};

export default HomePage;
