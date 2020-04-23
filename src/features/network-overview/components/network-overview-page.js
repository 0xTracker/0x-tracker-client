import { Col, Row } from 'reactstrap';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD, URL } from '../../../constants';
import { media } from '../../../styles/util';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import ActiveTradersCard from '../../traders/components/active-traders-card';
import Footnote from '../../../components/footnote';
import Hidden from '../../../components/hidden';
import MobileTimePeriodFilter from '../../../components/mobile-time-period-filter';
import NetworkOverviewStats from './network-overview-stats';
import NetworkMetrics from '../../metrics/components/network-metrics';
import ProtocolMetrics from '../../metrics/components/protocol-metrics';
import PageLayout from '../../../components/page-layout';
import SubTitle from '../../../components/sub-title';
import TabbedCard from '../../../components/tabbed-card';
import TimePeriodFilter from '../../../components/time-period-filter';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';
import TopProtocolsCard from './top-protocols-card';
import TraderTypesCard from '../../traders/components/trader-types-card';

const DashboardColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: ${(props) => (props.lastRow ? '0' : '1.25rem')};
  }

  ${media.greaterThan('lg')`
    margin-bottom: ${(props) => (props.lastRow ? '0' : '2rem')};

    &:last-child {
      margin-bottom: ${(props) => (props.lastRow ? '0' : '2rem')};
    }
  `}
`;

const StyledNetworkOverviewStats = styled(NetworkOverviewStats)`
  margin-bottom: 1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'for the last 24 hours',
  [TIME_PERIOD.WEEK]: 'for the past week',
  [TIME_PERIOD.MONTH]: 'for the past month',
  [TIME_PERIOD.YEAR]: 'for the past year',
  [TIME_PERIOD.ALL]: 'for all time',
};

const NetworkOverviewPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const period = params.get('period') || TIME_PERIOD.YEAR;
  const breakpoint = useCurrentBreakpoint();
  const periodFilterProps = {
    onChange: (newPeriod) => {
      history.push(`${URL.NETWORK_INSIGHTS}?period=${newPeriod}`);
    },
    value: period,
  };

  return (
    <>
      <Helmet key="network-insights">
        <title>Network Insights</title>
      </Helmet>
      <PageLayout
        filter={
          breakpoint.lessThan('sm') ? (
            <MobileTimePeriodFilter {...periodFilterProps} />
          ) : (
            <TimePeriodFilter {...periodFilterProps} />
          )
        }
        title={
          <span>
            Network Insights
            <Hidden above="xs">
              <SubTitle>{periodDescriptions[period]}</SubTitle>
            </Hidden>
          </span>
        }
      >
        <StyledNetworkOverviewStats period={period} />
        <Row>
          <DashboardColumn lg={7}>
            <TabbedCard
              css="height: 360px;"
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
          </DashboardColumn>
          <DashboardColumn lg={5}>
            <TabbedCard
              css="height: 360px;"
              tabs={[
                {
                  component: <TopTokens period={period} />,
                  footer: <Footnote>Top tokens by volume</Footnote>,
                  title: 'Top Tokens',
                },
                {
                  component: <TopRelayers period={period} />,
                  footer: <Footnote>Top relayers by volume</Footnote>,
                  title: 'Top Relayers',
                },
              ]}
            />
          </DashboardColumn>
        </Row>
        <Row>
          <DashboardColumn lg={5}>
            <TopProtocolsCard period={period} />
          </DashboardColumn>
          <DashboardColumn lg={7}>
            <TabbedCard
              css="height: 360px;"
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
          </DashboardColumn>
        </Row>
        <Row>
          <DashboardColumn lastRow lg={7}>
            <ActiveTradersCard period={period} />
          </DashboardColumn>
          <DashboardColumn lastRow lg={5}>
            <TraderTypesCard period={period} />
          </DashboardColumn>
        </Row>
      </PageLayout>
    </>
  );
};

NetworkOverviewPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default NetworkOverviewPage;
