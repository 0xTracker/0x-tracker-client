import _ from 'lodash';
import { Bar, BarChart } from 'recharts';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';

const MiniTraderMetricsChart = ({ data, height, type, width }) => {
  if (_.isEmpty(data)) {
    return null;
  }

  return (
    <div
      css={`
        border-bottom: 1px solid ${COLORS.ACCENT.ANZAC_200};
      `}
    >
      <BarChart
        data={data.map((dataPoint) => ({
          ...dataPoint,
          date: dataPoint.date.toISOString(),
        }))}
        height={height}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        width={width}
      >
        <Bar
          animationDuration={0}
          dataKey={type}
          fill={COLORS.ACCENT.ANZAC_500}
        />
      </BarChart>
    </div>
  );
};

MiniTraderMetricsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      fillCount: PropTypes.shape({
        maker: PropTypes.number.isRequired,
        taker: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
      fillVolume: PropTypes.shape({
        maker: PropTypes.number.isRequired,
        taker: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
      tradeCount: PropTypes.shape({
        maker: PropTypes.number.isRequired,
        taker: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
      tradeVolume: PropTypes.shape({
        maker: PropTypes.number.isRequired,
        taker: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  height: PropTypes.number.isRequired,
  type: PropTypes.oneOf([
    'fillCount.maker',
    'fillCount.taker',
    'fillCount.total',
    'fillVolume.maker',
    'fillVolume.taker',
    'fillVolume.total',
    'tradeCount.maker',
    'tradeCount.taker',
    'tradeCount.total',
    'tradeVolume.maker',
    'tradeVolume.taker',
    'tradeVolume.total',
  ]).isRequired,
  width: PropTypes.number.isRequired,
};

export default MiniTraderMetricsChart;
