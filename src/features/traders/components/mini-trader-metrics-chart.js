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
      fillCount: PropTypes.number.isRequired,
      fillVolume: PropTypes.number.isRequired,
      tradeCount: PropTypes.number.isRequired,
      tradeVolume: PropTypes.number.isRequired,
    }),
  ).isRequired,
  height: PropTypes.number.isRequired,
  type: PropTypes.oneOf([
    'fillCount',
    'fillVolume',
    'tradeCount',
    'tradeVolume',
  ]).isRequired,
  width: PropTypes.number.isRequired,
};

export default MiniTraderMetricsChart;
