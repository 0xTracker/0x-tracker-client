import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import Card from '../../../components/card';
import CardHeading from '../../../components/card-heading';
import ChartsContainer from '../../../components/charts-container';
import ContentSection from '../../../components/content-section';
import DashboardMetrics from './dashboard-metrics';
import Fills from '../../fills/components/fills';
import getIsMobile from '../../../selectors/get-is-mobile';
import getPeriodOptions from '../../../util/get-period-options';
import LatestNews from '../../news/components/latest-news';
import NetworkFees from '../../metrics/components/network-fees';
import NetworkVolume from '../../metrics/components/network-volume';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';

const CHARTS_HEIGHT = 265;

const Dashboard = ({ isMobile }) => (
  <ContentSection>
    <DashboardMetrics css="margin-bottom: 2em;" />
    <Row css="margin-bottom: 2em;">
      <Col lg={7}>
        <ChartsContainer
          charts={[
            { title: 'Network Volume', component: NetworkVolume },
            { title: 'Fills', component: <NetworkVolume type="fills" /> },
            { title: 'Fees', component: NetworkFees },
          ]}
          chartsHeight={CHARTS_HEIGHT}
          defaultPeriod={TIME_PERIOD.MONTH}
          periods={
            !isMobile &&
            getPeriodOptions([
              TIME_PERIOD.DAY,
              TIME_PERIOD.WEEK,
              TIME_PERIOD.MONTH,
              TIME_PERIOD.YEAR,
              TIME_PERIOD.ALL,
            ])
          }
        />
      </Col>
      <Col lg={5}>
        <ChartsContainer
          charts={[
            { title: 'Top Tokens', component: TopTokens },
            { title: 'Top Relayers', component: TopRelayers },
          ]}
          chartsHeight={CHARTS_HEIGHT}
          defaultPeriod={TIME_PERIOD.DAY}
          periods={
            !isMobile &&
            getPeriodOptions([
              TIME_PERIOD.DAY,
              TIME_PERIOD.WEEK,
              TIME_PERIOD.MONTH,
            ])
          }
        />
      </Col>
    </Row>
    <Row>
      <Col lg={7}>
        <Card header={<CardHeading>Recent Fills</CardHeading>} padded>
          <Fills />
        </Card>
      </Col>
      <Col lg={5}>
        <Card header={<CardHeading>Latest News</CardHeading>} padded>
          <LatestNews />
        </Card>
      </Col>
    </Row>
  </ContentSection>
);

Dashboard.propTypes = {
  isMobile: PropTypes.bool,
};

Dashboard.defaultProps = {
  isMobile: false,
};

const mapStateToProps = state => ({
  isMobile: getIsMobile(state),
});

export default connect(mapStateToProps)(Dashboard);
