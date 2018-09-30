import PropTypes from 'prop-types';
import React from 'react';

import formatCurrency from '../../../util/format-currency';
import LoadingIndicator from '../../../components/loading-indicator';
import withConversionRate from './with-conversion-rate';

const LocalisedAmount = ({
  amount,
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

  return formatCurrency(amount * conversionRate, displayCurrency);
};

LocalisedAmount.propTypes = {
  amount: PropTypes.number.isRequired,
  conversionRate: PropTypes.number,
  displayCurrency: PropTypes.string.isRequired,
  loadingIndicator: PropTypes.node,
};

LocalisedAmount.defaultProps = {
  conversionRate: undefined,
  loadingIndicator: undefined,
};

export default withConversionRate(LocalisedAmount);
