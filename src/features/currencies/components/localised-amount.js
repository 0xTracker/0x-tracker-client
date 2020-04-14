import PropTypes from 'prop-types';
import React from 'react';

import formatCurrency from '../../../util/format-currency';
import LoadingIndicator from '../../../components/loading-indicator';
import useConversionRate from '../hooks/use-conversion-rate';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import summarizeCurrency from '../../../util/summarize-currency';

const LocalisedAmount = ({
  amount,
  className,
  loadingIndicator,
  preferredPrecision,
  summarize,
}) => {
  const displayCurrency = useDisplayCurrency();
  const conversionRate = useConversionRate();

  if (conversionRate === undefined) {
    return loadingIndicator === undefined ? (
      <LoadingIndicator size="small" type="cylon" />
    ) : (
      loadingIndicator
    );
  }

  const convertedAmount = amount * conversionRate;

  if (summarize) {
    return (
      <span
        className={className}
        title={formatCurrency(convertedAmount, displayCurrency)}
      >
        {summarizeCurrency(convertedAmount, displayCurrency)}
      </span>
    );
  }

  return (
    <span className={className}>
      {formatCurrency(convertedAmount, displayCurrency, preferredPrecision)}
    </span>
  );
};

LocalisedAmount.propTypes = {
  amount: PropTypes.number.isRequired,
  className: PropTypes.string,
  loadingIndicator: PropTypes.node,
  preferredPrecision: PropTypes.number,
  summarize: PropTypes.bool,
};

LocalisedAmount.defaultProps = {
  className: undefined,
  loadingIndicator: undefined,
  preferredPrecision: undefined,
  summarize: false,
};

export default LocalisedAmount;
