import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LocalisedAmount from '../../currencies/components/localised-amount';
import StatWidget from '../../../components/stat-widget';
import PercentageChange from '../../../components/percentage-change';

const PriceWidget = ({ price, ...otherProps }) => (
  <StatWidget title="Price" {...otherProps}>
    {price.close === null ? (
      'Not Available'
    ) : (
      <span css="align-items: baseline; display: flex;">
        <LocalisedAmount amount={price.close} />
        {_.isFinite(price.change) && (
          <PercentageChange>{price.change}</PercentageChange>
        )}
      </span>
    )}
  </StatWidget>
);

PriceWidget.propTypes = {
  className: PropTypes.string,
  price: PropTypes.shape({
    change: PropTypes.number,
    close: PropTypes.number,
  }).isRequired,
};

PriceWidget.defaultProps = {
  className: undefined,
};

export default PriceWidget;
