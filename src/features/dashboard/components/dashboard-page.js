import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import ChartsContainer from '../../../components/charts-container';
import ContentSection from '../../../components/content-section';
import Fills from '../../fills/components/fills';
import getIsMobile from '../../../selectors/get-is-mobile';
import getPeriodOptions from '../../../util/get-period-options';
import NetworkFees from '../../metrics/components/network-fees';
import NetworkVolume from '../../metrics/components/network-volume';
import TopRelayers from '../../relayers/components/top-relayers';
import TopTokens from '../../tokens/components/top-tokens';
import withRates from '../../currencies/components/with-rates';

const CHARTS_HEIGHT = 265;

const Dashboard = ({ isMobile }) => [
  <ContentSection key="content">
    <div className="row">
      <div className="col-xs-12 col-lg-7 mb-4">
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
      </div>
      <div className="col-xs-12 col-lg-5 mb-4">
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
      </div>
    </div>
    {!isMobile && <Fills heading="Recent Fills" />}
  </ContentSection>,
];

Dashboard.propTypes = {
  isMobile: PropTypes.bool,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

Dashboard.defaultProps = {
  isMobile: false,
};

const mapStateToProps = state => ({
  isMobile: getIsMobile(state),
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps),
  withRates,
);

export default enhance(Dashboard);
