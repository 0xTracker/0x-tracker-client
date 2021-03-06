import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { getPeriodDescriptor } from '../../../util';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) =>
  `Protocol fees generated by trades ${getPeriodDescriptor(
    period,
  )}. Protocol fees are collected for every fill on v3 of the 0x protocol.`;

const ProtocolFeesWidget = ({
  accumulatedFees,
  change,
  className,
  period,
  showPeriod,
  tooltip,
}) => (
  <StatWidget
    className={className}
    period={period}
    showPeriod={showPeriod}
    title="Protocol Fees"
    tooltip={tooltip || createTooltip(period)}
  >
    {_.isNumber(accumulatedFees) ? (
      <span css="align-items: baseline; display: flex;">
        {accumulatedFees > 0 ? (
          <LocalisedAmount
            amount={accumulatedFees}
            loadingIndicator={loadingIndicator}
            summarize
          />
        ) : (
          'None'
        )}
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
  tooltip: PropTypes.string,
};

ProtocolFeesWidget.defaultProps = {
  accumulatedFees: undefined,
  change: undefined,
  className: undefined,
  period: undefined,
  showPeriod: undefined,
  tooltip: undefined,
};

export default ProtocolFeesWidget;
