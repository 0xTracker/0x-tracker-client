import { compose } from 'recompose';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { getConversionRate } from '../../currencies/selectors';
import AsyncAddressMetricsChart from './async-address-metrics-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useAddressMetrics from '../hooks/use-address-metrics';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const AddressMetrics = ({ address, conversionRate, keyMetric, period }) => {
  const metrics = useAddressMetrics(address, { period });
  const displayCurrency = useDisplayCurrency();

  if (metrics.loading || conversionRate === undefined) {
    return <LoadingIndicator centered />;
  }

  const data = metrics.data.map(metric => ({
    date: new Date(metric.date),
    fillCount: metric.fillCount,
    fillVolume: metric.fillVolume.USD * conversionRate,
  }));

  return (
    <AsyncAddressMetricsChart
      data={data}
      keyMetric={keyMetric}
      localCurrency={displayCurrency}
      period={period}
    />
  );
};

AddressMetrics.propTypes = {
  address: PropTypes.string.isRequired,
  conversionRate: PropTypes.number,
  keyMetric: PropTypes.string,
  period: sharedPropTypes.timePeriod.isRequired,
};

AddressMetrics.defaultProps = {
  conversionRate: undefined,
  keyMetric: 'fillVolume',
};

const mapStateToProps = state => ({
  conversionRate: getConversionRate(state),
});

const enhance = compose(connect(mapStateToProps));

export default enhance(AddressMetrics);
