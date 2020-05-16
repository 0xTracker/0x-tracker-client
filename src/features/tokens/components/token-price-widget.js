import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import StatWidget from '../../../components/stat-widget';

const TokenPriceWidget = ({ className, price }) => (
  <StatWidget
    className={className}
    title="Current Price"
    tooltip="The last price this token was traded at on a 0x relayer."
  >
    {_.isFinite(price.close) ? (
      <span>
        <LocalisedAmount amount={price.close} />
        {_.isFinite(price.change) && (
          <PercentageChange>{price.change}</PercentageChange>
        )}
      </span>
    ) : (
      'Not Available'
    )}
  </StatWidget>
);

TokenPriceWidget.propTypes = {
  className: PropTypes.string,
  price: PropTypes.shape({
    change: PropTypes.number,
    close: PropTypes.number,
  }).isRequired,
};

TokenPriceWidget.defaultProps = {
  className: undefined,
};

export default TokenPriceWidget;
