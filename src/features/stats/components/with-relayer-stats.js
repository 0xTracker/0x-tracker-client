import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { TIME_PERIOD } from '../../../constants';
import { getRelayersStats } from '../selectors';
import AutoReload from '../../../util/auto-reload';
import sharedPropTypes from '../../../prop-types';

const withRelayerStats = WrappedComponent => {
  class WithRelayerStatsHOC extends PureComponent {
    componentDidMount() {
      const { stats } = this.props;

      if (stats === undefined) {
        this.loadData();
      }

      AutoReload.addListener(this.loadData);
    }

    componentDidUpdate(prevProps) {
      const { period } = this.props;

      if (prevProps.period !== period) {
        this.loadData();
      }
    }

    componentWillUnmount() {
      AutoReload.removeListener(this.loadData);
    }

    loadData = () => {
      const { fetchRelayerStats, period } = this.props;

      fetchRelayerStats({ period });
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithRelayerStatsHOC.propTypes = {
    fetchRelayerStats: PropTypes.func.isRequired,
    period: sharedPropTypes.timePeriod,
    stats: PropTypes.object,
  };

  WithRelayerStatsHOC.defaultProps = {
    period: TIME_PERIOD.DAY,
    stats: undefined,
  };

  const mapStateToProps = (state, ownProps) => ({
    stats: getRelayersStats(state, ownProps),
  });

  const mapDispatchToProps = dispatch => ({
    fetchRelayerStats: dispatch.stats.fetchRelayerStats,
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WithRelayerStatsHOC);
};

export default withRelayerStats;
