import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { format as formatDate } from 'date-fns';
import currencyFormatter from 'currency-formatter';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { colors } from '../../../styles/constants';
import NetworkVolumeTooltip from './network-volume-tooltip';
import padMetrics from '../util/pad-metrics';
import sharedPropTypes from '../../../prop-types';

const formatAxisDate = date => formatDate(date, 'MMM DD');
const formatFillCount = fillCount => {
  if (fillCount === 0) {
    return '';
  }

  return numeral(fillCount).format('0,0');
};

class NetworkVolumeChart extends PureComponent {
  constructor() {
    super();

    this.formatCurrency = this.formatCurrency.bind(this);
  }

  formatCurrency(amount) {
    if (amount === 0) {
      return '';
    }

    const { displayCurrency } = this.props;

    const currency = currencyFormatter.findCurrency(displayCurrency);
    const shortAmount = numeral(amount).format('0.[0]a');

    if (currency.symbolOnLeft) {
      return `${currency.symbol} ${shortAmount}`;
    }

    return `${shortAmount} ${currency.symbol}`;
  }

  render() {
    const { displayCurrency, data, period, type } = this.props;
    const paddedMetrics = padMetrics(data, period, {
      fills: 0,
      volume: 0,
    });
    const sanitizedData = paddedMetrics.map(dataPoint => ({
      ...dataPoint,
      date: dataPoint.date.toISOString(),
    }));

    return (
      <ResponsiveContainer>
        <AreaChart
          data={sanitizedData}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <CartesianGrid stroke={colors.wildSand} />
          <Area
            animationDuration={0}
            dataKey={type}
            fill={colors.persianBlue}
            fillOpacity={0.2}
            stroke={colors.persianBlue}
            strokeOpacity={0.4}
            strokeWidth={2}
            type="monotone"
          />
          <XAxis
            axisLine={false}
            dataKey="date"
            minTickGap={60}
            tick={{ fill: colors.tuna, fontSize: '0.9em' }}
            tickFormatter={formatAxisDate}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            dataKey={type}
            minTickGap={20}
            mirror
            padding={{ top: 25 }}
            tick={{ fill: colors.tuna, fontSize: '0.9em' }}
            tickFormatter={
              type === 'volume' ? this.formatCurrency : formatFillCount
            }
            tickLine={false}
          />
          <Tooltip
            content={<NetworkVolumeTooltip currency={displayCurrency} />}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

NetworkVolumeChart.propTypes = {
  data: PropTypes.array.isRequired,
  displayCurrency: PropTypes.string.isRequired,
  period: sharedPropTypes.timePeriod.isRequired,
  type: PropTypes.string,
};

NetworkVolumeChart.defaultProps = {
  type: 'volume',
};

export default NetworkVolumeChart;
