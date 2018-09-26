import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as statsActionCreators from '../actions';
import { TIME_PERIOD } from '../../../constants';
import { getRelayersStats } from '../selectors';
import sharedPropTypes from '../../../prop-types';

const withRelayerStats = WrappedComponent => {
  class WithRelayerStatsHOC extends PureComponent {
    componentDidMount() {
      const { fetchRelayerStats, period, stats } = this.props;

      if (stats === undefined) {
        fetchRelayerStats(period);
      }
    }

    componentDidUpdate(prevProps) {
      const { autoReloadKey, fetchRelayerStats, period } = this.props;

      if (
        prevProps.autoReloadKey !== autoReloadKey ||
        prevProps.period !== period
      ) {
        fetchRelayerStats(period);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithRelayerStatsHOC.propTypes = {
    autoReloadKey: PropTypes.string,
    fetchRelayerStats: PropTypes.func.isRequired,
    period: sharedPropTypes.timePeriod,
    stats: PropTypes.object,
  };

  WithRelayerStatsHOC.defaultProps = {
    autoReloadKey: null,
    period: TIME_PERIOD.DAY,
    stats: undefined,
  };

  const mapStateToProps = (state, ownProps) => ({
    autoReloadKey: state.autoReload.key,
    stats: getRelayersStats(state, ownProps),
  });

  const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(statsActionCreators, dispatch),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WithRelayerStatsHOC);
};

export default withRelayerStats;
