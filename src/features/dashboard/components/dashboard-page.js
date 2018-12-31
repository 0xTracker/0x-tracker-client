import { Col, Row } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

import { TIME_PERIOD, URL } from '../../../constants';
import { media } from '../../../styles/util';
import Card from '../../../components/card';
import CardHeading from '../../../components/card-heading';
import ChartsContainer from '../../../components/charts-container';
import ContentSection from '../../../components/content-section';
import DashboardMetrics from './dashboard-metrics';
import Fills from '../../fills/components/fills';
import getPeriodOptions from '../../../util/get-period-options';
import LatestNews from '../../news/components/latest-news';
import Link from '../../../components/link';
import NetworkFees from '../../metrics/components/network-fees';
import NetworkVolume from '../../metrics/components/network-volume';
import Pill from '../../../components/pill';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';

const CHARTS_HEIGHT = 265;

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
          chartsHeight={CHARTS_HEIGHT}
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
          chartsHeight={CHARTS_HEIGHT}
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
        <Card
          header={
            <React.Fragment>
              <CardHeading>Recent Fills</CardHeading>
              <Pill as={Link} highlighted href={URL.FILLS}>
                View More
              </Pill>
            </React.Fragment>
          }
          padded
        >
          <Fills />
        </Card>
      </DashboardColumn>
      <DashboardColumn lastRow lg={5}>
        <Card
          header={
            <React.Fragment>
              <CardHeading>Latest News</CardHeading>
              <Pill as={Link} highlighted href={URL.NEWS}>
                View More
              </Pill>
            </React.Fragment>
          }
          padded
        >
          <LatestNews />
        </Card>
      </DashboardColumn>
    </Row>
  </ContentSection>
);

export default DashboardPage;
