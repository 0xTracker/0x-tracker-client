import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import { useMetadata } from '../../../hooks';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import HomePageMetrics from './home-page-metrics';
import LatestNewsCard from '../../news/components/latest-news-card';
import Link from '../../../components/link';
import NetworkMetrics from '../../metrics/components/network-metrics';
import PageLayout from '../../../components/page-layout';
import Pill from '../../../components/pill';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import TabbedCard from '../../../components/tabbed-card';
import TopPerformersCard from '../../top-performers/components/top-performers-card';

const HomePage = () => {
  useMetadata({
    title: '0x Protocol Metrics, News & Trading Activity',
  });

  const breakpoint = useCurrentBreakpoint();

  return (
    <PageLayout>
      <CardGrid>
        <HomePageMetrics />
        <CardGridRow>
          <CardGridCol lg={7}>
            <TabbedCard
              tabs={[
                {
                  actions: (
                    <Pill as={Link} href={URL.NETWORK_INSIGHTS}>
                      More Insights
                    </Pill>
                  ),
                  component: (
                    <NetworkMetrics
                      period={TIME_PERIOD.YEAR}
                      type="tradeVolume"
                    />
                  ),
                  errorMessage:
                    'An error occurred while loading the volume chart',
                  title: 'Volume',
                },
                {
                  actions: (
                    <Pill as={Link} href={URL.NETWORK_INSIGHTS}>
                      More Insights
                    </Pill>
                  ),
                  component: (
                    <NetworkMetrics
                      period={TIME_PERIOD.YEAR}
                      type="tradeCount"
                    />
                  ),
                  errorMessage:
                    'An error occurred while loading the trades chart',
                  title: 'Trades',
                },
              ]}
            />
          </CardGridCol>
          <CardGridCol lg={5}>
            <TopPerformersCard initialPeriod={TIME_PERIOD.DAY} />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol lg={7}>
            <RecentFillsCard />
          </CardGridCol>
          <CardGridCol lg={5}>
            <LatestNewsCard
              compact={
                breakpoint.lessThan('sm') || breakpoint.greaterThan('md')
              }
              showImages={breakpoint.greaterThan('xs')}
            />
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default HomePage;
