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

  return (
    <span className={className}>
      {summarize
        ? summarizeCurrency(convertedAmount, displayCurrency)
        : formatCurrency(convertedAmount, displayCurrency)}
    </span>
  );
};

LocalisedAmount.propTypes = {
  amount: PropTypes.number.isRequired,
  className: PropTypes.string,
  loadingIndicator: PropTypes.node,
  summarize: PropTypes.bool,
};

LocalisedAmount.defaultProps = {
  className: undefined,
  loadingIndicator: undefined,
  summarize: false,
};

export default LocalisedAmount;
