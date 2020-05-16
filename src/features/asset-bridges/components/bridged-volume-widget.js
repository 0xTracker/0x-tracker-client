import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PriceChange from '../../../components/price-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const BridgedVolumeWidget = ({ change, period, volume, ...otherProps }) => (
  <StatWidget
    period={period}
    title="Bridged Volume"
    tooltip="The total volume of all trades which involved liquidity sourced from bridging contracts in the selected period."
    {...otherProps}
  >
    {_.isNumber(volume) ? (
      <span css="align-items: baseline; display: flex;">
        <LocalisedAmount
          amount={volume}
          loadingIndicator={loadingIndicator}
          summarize
        />
        {change !== undefined && <PriceChange>{change}</PriceChange>}
      </span>
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

BridgedVolumeWidget.propTypes = {
  change: PropTypes.number,
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  volume: PropTypes.number,
};

BridgedVolumeWidget.defaultProps = {
  change: undefined,
  className: undefined,
  period: undefined,
  volume: undefined,
};

export default BridgedVolumeWidget;
