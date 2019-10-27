import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import StatWidget from '../../../components/stat-widget';

const ActiveTradersWidget = ({ className, traderCount }) => (
  <StatWidget className={className} title="Active Traders (24H)">
    {_.isNumber(traderCount) ? numeral(traderCount).format('0,0') : undefined}
  </StatWidget>
);

ActiveTradersWidget.propTypes = {
  className: PropTypes.string,
  traderCount: PropTypes.number,
};

ActiveTradersWidget.defaultProps = {
  className: undefined,
  traderCount: undefined,
};

export default ActiveTradersWidget;
