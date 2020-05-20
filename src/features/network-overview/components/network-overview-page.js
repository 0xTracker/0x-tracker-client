import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { useMetadata, useNavigator, useSearchParam } from '../../../hooks';
import ActiveTradersCard from '../../traders/components/active-traders-card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import Footnote from '../../../components/footnote';
import Link from '../../../components/link';
import NetworkOverviewStats from './network-overview-stats';
import NetworkMetrics from '../../metrics/components/network-metrics';
import Pill from '../../../components/pill';
import ProtocolMetrics from '../../metrics/components/protocol-metrics';
import PageLayout from '../../../components/page-layout';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import SubTitle from '../../../components/sub-title';
import TabbedCard from '../../../components/tabbed-card';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';
import TopProtocolsCard from './top-protocols-card';
import TraderTypesCard from '../../traders/components/trader-types-card';

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'from the past 24 hours',
  [TIME_PERIOD.WEEK]: 'from the past week',
  [TIME_PERIOD.MONTH]: 'from the past 30 days',
  [TIME_PERIOD.YEAR]: 'from the past year',
  [TIME_PERIOD.ALL]: 'from all time',
};

const NetworkOverviewPage = () => {
  useMetadata({ title: '0x Protocol Trading Activity, Metrics & Charts' });

  const { navigateTo } = useNavigator();
  const period = useSearchParam('period', TIME_PERIOD.YEAR);

  return (
    <PageLayout
      filter={
        <ResponsiveTimePeriodFilter
          onChange={(newPeriod) => {
            navigateTo(URL.NETWORK_INSIGHTS, { period: newPeriod });
          }}
          value={period}
        />
      }
      title={
        <>
          Network Insights
          <SubTitle>{periodDescriptions[period]}</SubTitle>
        </>
      }
    >
      <CardGrid>
        <NetworkOverviewStats period={period} />
        <CardGridRow>
          <CardGridCol lg={7}>
            <TabbedCard
              tabs={[
                {
                  component: (
                    <NetworkMetrics period={period} type="tradeVolume" />
                  ),
                  title: 'Volume',
                },
                {
                  component: (
                    <NetworkMetrics period={period} type="tradeCount" />
                  ),
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
                  component: <TopTokens period={period} />,
                  footer: <Footnote>Top tokens by volume</Footnote>,
                  title: 'Top Tokens',
                },
                {
                  actions: (
                    <Pill as={Link} href={URL.RELAYERS}>
                      View More
                    </Pill>
                  ),
                  component: <TopRelayers period={period} />,
                  footer: <Footnote>Top relayers by volume</Footnote>,
                  title: 'Top Relayers',
                },
              ]}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol lg={5}>
            <TopProtocolsCard period={period} />
          </CardGridCol>
          <CardGridCol lg={7}>
            <TabbedCard
              tabs={[
                {
                  component: <ProtocolMetrics period={period} />,
                  title: 'Protocol Adoption',
                },
                {
                  component: (
                    <NetworkMetrics period={period} type="protocolFees" />
                  ),
                  title: 'Protocol Fees',
                },
              ]}
            />
          </CardGridCol>
        </CardGridRow>
        <CardGridRow>
          <CardGridCol lg={7}>
            <ActiveTradersCard period={period} />
          </CardGridCol>
          <CardGridCol lg={5}>
            <TraderTypesCard period={period} />
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </PageLayout>
  );
};

export default NetworkOverviewPage;
