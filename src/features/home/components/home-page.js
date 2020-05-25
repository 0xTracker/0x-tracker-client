import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import { useMetadata } from '../../../hooks';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import HomePageMetrics from './home-page-metrics';
import HomePageTopRelayersFooter from './home-page-top-relayers-footer';
import HomePageTopTokensFooter from './home-page-top-tokens-footer';
import LatestNewsCard from '../../news/components/latest-news-card';
import Link from '../../../components/link';
import NetworkMetrics from '../../metrics/components/network-metrics';
import PageLayout from '../../../components/page-layout';
import Pill from '../../../components/pill';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import TabbedCard from '../../../components/tabbed-card';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';

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
            <TabbedCard
              tabs={[
                {
                  actions: (
                    <Pill as={Link} href={URL.TOKENS}>
                      View More
                    </Pill>
                  ),
                  component: <TopTokens period={TIME_PERIOD.DAY} />,
                  errorMessage:
                    'An error occurred while loading the top tokens',
                  footer: <HomePageTopTokensFooter period={TIME_PERIOD.DAY} />,
                  title: 'Top Tokens',
                },
                {
                  actions: (
                    <Pill as={Link} href={URL.RELAYERS}>
                      View More
                    </Pill>
                  ),
                  component: <TopRelayers period={TIME_PERIOD.DAY} />,
                  errorMessage:
                    'An error occurred while loading the top relayers',
                  footer: (
                    <HomePageTopRelayersFooter period={TIME_PERIOD.DAY} />
                  ),
                  title: 'Top Relayers',
                },
              ]}
            />
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
