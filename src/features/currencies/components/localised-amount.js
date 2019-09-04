import PropTypes from 'prop-types';
import React from 'react';

import formatCurrency from '../../../util/format-currency';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const LocalisedAmount = ({ amount, className, loadingIndicator }) => {
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

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
  loadingIndicator: PropTypes.node,
};

LocalisedAmount.defaultProps = {
  className: undefined,
  loadingIndicator: undefined,
};

export default LocalisedAmount;
