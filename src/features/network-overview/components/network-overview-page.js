import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { useMetadata, useNavigator, useSearchParam } from '../../../hooks';
import { InsightsIcon } from '../../../components/icons';
import { getPeriodDescriptor } from '../../../util';
import ActiveTradersCard from '../../traders/components/active-traders-card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import Footnote from '../../../components/footnote';
import Link from '../../../components/link';
import NetworkOverviewStats from './network-overview-stats';
import NetworkMetrics from '../../metrics/components/network-metrics';
import NetworkVolume from '../../metrics/components/network-volume';
import Pill from '../../../components/pill';
import ProtocolMetrics from '../../metrics/components/protocol-metrics';
import PageLayout from '../../../components/page-layout';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';
import TopApps from '../../apps/components/top-apps';
import TopTokens from '../../tokens/components/top-tokens';
import TopProtocolsCard from './top-protocols-card';
import TraderTypesCard from '../../traders/components/trader-types-card';

const NetworkOverviewPage = () => {
  useMetadata({ title: '0x Protocol Trading Activity, Metrics & Charts' });

  const { navigateTo } = useNavigator();
  const period = useSearchParam('period', TIME_PERIOD.YEAR);

  return (
    <PageLayout
      actions={
        <ResponsiveTimePeriodFilter
          onChange={(newPeriod) => {
            navigateTo(URL.NETWORK_INSIGHTS, { period: newPeriod });
          }}
          value={period}
        />
      }
      icon={<InsightsIcon size={40} />}
      subTitle={getPeriodDescriptor(period)}
      title="Network Insights"
    >
      <CardGrid>
        <NetworkOverviewStats period={period} />
        <CardGridRow>
          <CardGridCol lg={7}>
            <TabbedCard
              tabs={[
                {
                  component: (
                    <NetworkVolume period={period} type="tradeVolume" />
                  ),
                  title: 'Volume',
                },
                {
                  component: (
                    <NetworkVolume period={period} type="tradeCount" />
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
                    <Pill as={Link} href={URL.APPS}>
                      View More
                    </Pill>
                  ),
                  component: <TopApps period={period} />,
                  footer: <Footnote>Top apps by volume</Footnote>,
                  title: 'Top Apps',
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
