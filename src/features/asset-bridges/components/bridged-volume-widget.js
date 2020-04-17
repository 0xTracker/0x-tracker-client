import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const BridgedVolumeWidget = ({ period, volume, ...otherProps }) => (
  <StatWidget
    period={period}
    title="Bridged Volume"
    tooltip="The total volume of all trades which involved liquidity sourced from bridging contracts in the selected period."
    {...otherProps}
  >
    {_.isNumber(volume) ? (
      <LocalisedAmount
        amount={volume}
        loadingIndicator={loadingIndicator}
        summarize
      />
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

BridgedVolumeWidget.propTypes = {
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  volume: PropTypes.number,
};

BridgedVolumeWidget.defaultProps = {
  className: undefined,
  period: undefined,
  volume: undefined,
};

export default BridgedVolumeWidget;
