import PropTypes from 'prop-types';
import React from 'react';

import LocalisedAmount from '../../currencies/components/localised-amount';
import StatWidget from '../../../components/stat-widget';

const PriceRangeWidget = ({ price, ...otherProps }) => (
  <StatWidget
    title="Price Range"
    tooltip="Low-high price range for the selected period."
    {...otherProps}
  >
    <span>
      <LocalisedAmount amount={price.low} summarize />
      {' - '}
      <LocalisedAmount amount={price.high} summarize />
    </span>
  </StatWidget>
);

PriceRangeWidget.propTypes = {
  className: PropTypes.string,
  price: PropTypes.shape({
    high: PropTypes.number,
    low: PropTypes.number,
  }).isRequired,
};

PriceRangeWidget.defaultProps = {
  className: undefined,
};

export default PriceRangeWidget;
