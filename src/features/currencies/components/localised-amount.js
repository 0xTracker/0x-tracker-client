import PropTypes from 'prop-types';
import React from 'react';

import formatCurrency from '../../../util/format-currency';
import LoadingIndicator from '../../../components/loading-indicator';
import withConversionRate from './with-conversion-rate';

const LocalisedAmount = ({
  amount,
  className,
  conversionRate,
  displayCurrency,
  loadingIndicator,
}) => {
  if (conversionRate === undefined) {
    return loadingIndicator === undefined ? (
      <LoadingIndicator size="small" type="cylon" />
    ) : (
      loadingIndicator
    );
  }

  return (
    <span className={className}>
      {formatCurrency(amount * conversionRate, displayCurrency)}
    </span>
  );
};

LocalisedAmount.propTypes = {
  amount: PropTypes.number.isRequired,
  className: PropTypes.string,
  conversionRate: PropTypes.number,
  displayCurrency: PropTypes.string.isRequired,
  loadingIndicator: PropTypes.node,
};

LocalisedAmount.defaultProps = {
  className: undefined,
  conversionRate: undefined,
  loadingIndicator: undefined,
};

export default withConversionRate(LocalisedAmount);
