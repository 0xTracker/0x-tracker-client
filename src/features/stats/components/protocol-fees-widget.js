import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
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
      <LocalisedAmount
        amount={accumulatedFees}
        loadingIndicator={loadingIndicator}
      />
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

ProtocolFeesWidget.propTypes = {
  accumulatedFees: PropTypes.number,
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  showPeriod: PropTypes.bool,
};

ProtocolFeesWidget.defaultProps = {
  accumulatedFees: undefined,
  className: undefined,
  period: undefined,
  showPeriod: undefined,
};

export default ProtocolFeesWidget;
