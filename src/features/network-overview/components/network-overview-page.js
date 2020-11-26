import React from 'react';

import { TIME_PERIOD, URL } from '../../../constants';
import { useMetadata, useNavigator, useSearchParam } from '../../../hooks';
import { InsightsIcon } from '../../../components/icons';
import { getPeriodDescriptor } from '../../../util';
import ActiveTradersCard from '../../traders/components/active-traders-card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import NetworkOverviewStats from './network-overview-stats';
import NetworkMetrics from '../../metrics/components/network-metrics';
import ProtocolMetrics from '../../metrics/components/protocol-metrics';
import PageLayout from '../../../components/page-layout';
import ResponsiveTimePeriodFilter from '../../../components/responsive-time-period-filter';
import TabbedCard from '../../../components/tabbed-card';
import TopProtocolsCard from './top-protocols-card';
import TraderTypesCard from '../../traders/components/trader-types-card';
import TopPerformersCard from '../../top-performers/components/top-performers-card';
import TradingMetricsCard from './trading-metrics-card';

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
            <TradingMetricsCard period={period} />
          </CardGridCol>
          <CardGridCol lg={5}>
            <TopPerformersCard canTogglePeriod={false} initialPeriod={period} />
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
