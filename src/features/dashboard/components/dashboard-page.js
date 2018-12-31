import { Col, Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD } from '../../../constants';
import { media } from '../../../styles/util';
import ChartsContainer from '../../../components/charts-container';
import ContentSection from '../../../components/content-section';
import DashboardMetrics from './dashboard-metrics';
import getPeriodOptions from '../../../util/get-period-options';
import LatestNewsCard from '../../news/components/latest-news-card';
import NetworkFees from '../../metrics/components/network-fees';
import NetworkVolume from '../../metrics/components/network-volume';
import RecentFillsCard from '../../fills/components/recent-fills-card';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';

const DashboardColumn = styled(Col)`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: ${props => (props.lastRow ? '0' : '2rem')};
  }

  ${media.greaterThan('lg')`
    margin-bottom: ${props => (props.lastRow ? '0' : '2rem')};
  `}
`;

const DashboardPage = () => (
  <ContentSection>
    <DashboardMetrics css="margin-bottom: 2rem;" />
    <Row>
      <DashboardColumn lg={7}>
        <ChartsContainer
          charts={[
            { title: 'Network Volume', component: NetworkVolume },
            { title: 'Fills', component: <NetworkVolume type="fills" /> },
            { title: 'Fees', component: NetworkFees },
          ]}
          defaultPeriod={TIME_PERIOD.MONTH}
          periods={getPeriodOptions([
            TIME_PERIOD.DAY,
            TIME_PERIOD.WEEK,
            TIME_PERIOD.MONTH,
            TIME_PERIOD.YEAR,
            TIME_PERIOD.ALL,
          ])}
        />
      </DashboardColumn>
      <DashboardColumn lg={5}>
        <ChartsContainer
          charts={[
            { title: 'Top Tokens', component: TopTokens },
            { title: 'Top Relayers', component: TopRelayers },
          ]}
          defaultPeriod={TIME_PERIOD.DAY}
          periods={getPeriodOptions([
            TIME_PERIOD.DAY,
            TIME_PERIOD.WEEK,
            TIME_PERIOD.MONTH,
          ])}
        />
      </DashboardColumn>
    </Row>
    <Row>
      <DashboardColumn lastRow lg={7}>
        <RecentFillsCard />
      </DashboardColumn>
      <DashboardColumn lastRow lg={5}>
        <LatestNewsCard />
      </DashboardColumn>
    </Row>
  </ContentSection>
);

export default DashboardPage;
