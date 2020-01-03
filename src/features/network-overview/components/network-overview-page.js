import { Col, Row } from 'reactstrap';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD, URL } from '../../../constants';
import { media } from '../../../styles/util';
import ActiveTradersCard from '../../traders/components/active-traders-card';
import NetworkOverviewStats from './network-overview-stats';
import NetworkMetrics from '../../metrics/components/network-metrics';
import PageLayout from '../../../components/page-layout';
import ProtocolVolumeCard from './protocol-volume-card';
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
    margin-bottom: ${props => (props.lastRow ? '0' : '1.25rem')};
  }

  ${media.greaterThan('lg')`
    margin-bottom: ${props => (props.lastRow ? '0' : '2rem')};

    &:last-child {
      margin-bottom: ${props => (props.lastRow ? '0' : '2rem')};
    }
  `}
`;

const StyledNetworkOverviewStats = styled(NetworkOverviewStats)`
  margin-bottom: 1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

const NetworkOverviewPage = ({ history, location }) => {
  const params = new URLSearchParams(location.search);
  const period = params.get('period') || TIME_PERIOD.YEAR;

  return (
    <>
      <Helmet key="network-overview">
        <title>Network Overview</title>
      </Helmet>
      <PageLayout
        filter={
          <TimePeriodFilter
            onChange={newPeriod => {
              history.push(`${URL.NETWORK_OVERVIEW}?period=${newPeriod}`);
            }}
            value={period}
          />
        }
        title="Network Overview"
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
                  title: 'Trade Volume',
                },
                {
                  component: (
                    <NetworkMetrics period={period} type="tradeCount" />
                  ),
                  title: 'Trade Count',
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
                  title: 'Top Tokens',
                },
                {
                  component: <TopRelayers period={period} />,
                  title: 'Top Relayers',
                },
              ]}
            />
          </DashboardColumn>
        </Row>
        <Row>
          <DashboardColumn lg={7}>
            <ProtocolVolumeCard period={period} />
          </DashboardColumn>
          <DashboardColumn lg={5}>
            <TopProtocolsCard period={period} />
          </DashboardColumn>
        </Row>
        <Row>
          <DashboardColumn lg={7}>
            <ActiveTradersCard period={period} />
          </DashboardColumn>
          <DashboardColumn lg={5}>
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
