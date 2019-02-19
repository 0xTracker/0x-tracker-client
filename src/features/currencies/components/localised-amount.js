import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getConversionRate, getDisplayCurrency } from '../selectors';
import formatCurrency from '../../../util/format-currency';
import LoadingIndicator from '../../../components/loading-indicator';

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

const mapStateToProps = state => ({
  conversionRate: getConversionRate(state),
  displayCurrency: getDisplayCurrency(state),
});

export default connect(mapStateToProps)(LocalisedAmount);
