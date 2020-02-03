import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';
import formatDate from '../../../util/format-date';

const ProtocolMetricsTooltip = ({ currency, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, stats } = payload[0].payload;

  return (
    <ChartTooltip
      items={_.sortBy(stats, 'protocolVersion')
        .filter(stat => stat.fillCount > 0)
        .map(stat => ({
          label: `v${stat.protocolVersion}`,
          value: `${formatCurrency(stat.fillVolume, currency)} / ${numeral(
            stat.fillCount,
          ).format('0,0')} fills`,
        }))}
      title={formatDate(date, DATE_FORMAT.STANDARD)}
    />
  );
};

ProtocolMetricsTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        stats: PropTypes.arrayOf(
          PropTypes.shape({
            fillCount: PropTypes.number.isRequired,
            fillVolume: PropTypes.number.isRequired,
            protocolVersion: PropTypes.number.isRequired,
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
