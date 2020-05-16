import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) => {
  if (period === 'all') {
    return 'Sum of protocol fees accumulated since 0x was launched. Protocol fees are collected for every fill on v3 of the 0x protocol.';
  }

  return `Sum of protocol fees accumulated in the last ${period}. Protocol fees are collected for every fill on v3 of the 0x protocol.`;
};

const ProtocolFeesWidget = ({
  accumulatedFees,
  change,
  className,
  period,
  showPeriod,
}) => (
  <StatWidget
    className={className}
    period={period}
    showPeriod={showPeriod}
    title="Protocol Fees"
    tooltip={createTooltip(period)}
  >
    {_.isNumber(accumulatedFees) ? (
      <span css="align-items: baseline; display: flex;">
        <LocalisedAmount
          amount={accumulatedFees}
          loadingIndicator={loadingIndicator}
          summarize
        />
        {change !== undefined && <PercentageChange>{change}</PercentageChange>}
      </span>
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

ProtocolFeesWidget.propTypes = {
  accumulatedFees: PropTypes.number,
  change: PropTypes.number,
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  showPeriod: PropTypes.bool,
};

ProtocolFeesWidget.defaultProps = {
  accumulatedFees: undefined,
  change: undefined,
  className: undefined,
  period: undefined,
  showPeriod: undefined,
};

export default ProtocolFeesWidget;
