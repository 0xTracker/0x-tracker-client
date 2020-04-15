import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import formatCurrency from '../../../util/format-currency';
import MetricsChartTooltip from './metrics-chart-tooltip';

const ProtocolMetricsTooltip = ({ currency, granularity, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, stats } = payload[0].payload;

  return (
    <MetricsChartTooltip
      date={date}
      granularity={granularity}
      items={_.sortBy(stats, 'protocolVersion')
        .filter((stat) => stat.fillCount > 0)
        .map((stat) => ({
          label: `v${stat.protocolVersion}`,
          value: `${formatCurrency(stat.tradeVolume, currency)} / ${numeral(
            stat.fillCount,
          ).format('0,0')} fills`,
        }))}
    />
  );
};

ProtocolMetricsTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  granularity: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        stats: PropTypes.arrayOf(
          PropTypes.shape({
            fillCount: PropTypes.number.isRequired,
            protocolVersion: PropTypes.number.isRequired,
            tradeVolume: PropTypes.number.isRequired,
          }),
        ).isRequired,
      }).isRequired,
    }),
  ),
};

ProtocolMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default ProtocolMetricsTooltip;
