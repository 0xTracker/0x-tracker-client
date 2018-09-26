import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getConversionRate, getDisplayCurrency } from '../selectors';
import formatCurrency from '../../../util/format-currency';
import LoadingIndicator from '../../../components/loading-indicator';

const LocalisedAmount = ({
  amount,
  conversionRate,
  displayCurrency,
  loadingIndicator,
}) => {
  if (conversionRate === null) {
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
  conversionRate: null,
  loadingIndicator: undefined,
};

const mapStateToProps = state => ({
  conversionRate: getConversionRate(state),
  displayCurrency: getDisplayCurrency(state),
});

export default connect(mapStateToProps)(LocalisedAmount);
