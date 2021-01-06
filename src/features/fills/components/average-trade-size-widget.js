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
  `Average trade size ${getPeriodDescriptor(period)}.`;

const AverageTradeSizeWidget = ({
  avgSize,
  change,
  period,
  tooltip,
  ...otherProps
}) => (
  <StatWidget
    period={period}
    title="Avg Trade Size"
    tooltip={tooltip || createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(avgSize) && avgSize > 0 && (
      <span css="align-items: baseline; display: flex;">
        <LocalisedAmount amount={avgSize} summarize />
        {change !== undefined && <PercentageChange>{change}</PercentageChange>}
      </span>
    )}
    {_.isNumber(avgSize) && avgSize === 0 && 'None'}
    {!_.isNumber(avgSize) && loadingIndicator}
  </StatWidget>
);

AverageTradeSizeWidget.propTypes = {
  avgSize: PropTypes.number,
  change: PropTypes.number,
  period: sharedPropTypes.timePeriod,
  tooltip: PropTypes.string,
};

AverageTradeSizeWidget.defaultProps = {
  avgSize: undefined,
  change: undefined,
  period: undefined,
  tooltip: undefined,
};

export default AverageTradeSizeWidget;
