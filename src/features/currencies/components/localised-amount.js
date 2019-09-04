import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getConversionRate } from '../selectors';
import formatCurrency from '../../../util/format-currency';
import LoadingIndicator from '../../../components/loading-indicator';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const LocalisedAmount = ({
  amount,
  className,
  conversionRate,
  loadingIndicator,
}) => {
  const displayCurrency = useDisplayCurrency();

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
  loadingIndicator: PropTypes.node,
};

LocalisedAmount.defaultProps = {
  className: undefined,
  conversionRate: undefined,
  loadingIndicator: undefined,
};

const mapStateToProps = state => ({
  conversionRate: getConversionRate(state),
});

export default connect(mapStateToProps)(LocalisedAmount);
