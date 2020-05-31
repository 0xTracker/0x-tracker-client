import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { getPeriodDescriptor } from '../../../util';
import LoadingIndicator from '../../../components/loading-indicator';
import Number from '../../../components/number';
import PercentageChange from '../../../components/percentage-change';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const createTooltip = (period) =>
  `Unique number of tokens associated with trades ${getPeriodDescriptor(
    period,
  )}.`;

const TradedTokensWidget = ({
  change,
  period,
  tooltip,
  tradedTokens,
  ...otherProps
}) => (
  <StatWidget
    period={period}
    title="Traded Tokens"
    tooltip={tooltip || createTooltip(period)}
    {...otherProps}
  >
    {_.isNumber(tradedTokens) ? (
      <span css="align-items: baseline; display: flex;">
        {tradedTokens > 0 ? <Number summarize>{tradedTokens}</Number> : 'None'}
        {change !== undefined && <PercentageChange>{change}</PercentageChange>}
      </span>
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

TradedTokensWidget.propTypes = {
  change: PropTypes.number,
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  tooltip: PropTypes.string,
  tradedTokens: PropTypes.number,
};

TradedTokensWidget.defaultProps = {
  change: undefined,
  className: undefined,
  period: undefined,
  tooltip: undefined,
  tradedTokens: undefined,
};

export default TradedTokensWidget;
