import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const ProtocolFeesWidget = ({ accumulatedFees, className, period }) => (
  <StatWidget className={className} period={period} title="Protocol Fees">
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
};

ProtocolFeesWidget.defaultProps = {
  accumulatedFees: undefined,
  className: undefined,
  period: undefined,
};

export default ProtocolFeesWidget;
