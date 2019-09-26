import _ from 'lodash';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useHistory } from 'react-router';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import buildRelayerUrl from '../util/build-relayer-url';
import TopRelayersTooltip from './top-relayers-tooltip';

const formatXAxis = share => `${numeral(share).format('0.[00]')}%`;

const TopRelayersChart = ({ data, displayCurrency }) => {
  const history = useHistory();

  if (_.isEmpty(data)) {
    return 'No data available';
  }

  const redirectToRelayer = dataPoint => {
    const url = buildRelayerUrl(dataPoint.relayer);

    history.push(url);
  };

  const handleAxisClick = ({ value }) => {
    const clickedRelayer = data.find(
      dataPoint => dataPoint.relayer.name === value,
    );

    redirectToRelayer(clickedRelayer);
  };

  const handleBarClick = ({ relayer }) => {
    redirectToRelayer(relayer);
  };

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        <XAxis
          axisLine={false}
          domain={[0, 100]}
          tick={{ fill: 'currentColor', fontSize: '0.9em' }}
          tickFormatter={formatXAxis}
          tickLine={false}
          type="number"
        />
        <YAxis
          axisLine={false}
          dataKey="relayer.name"
          onClick={handleAxisClick}
          style={{ cursor: 'pointer' }}
          tick={{ fill: 'currentColor', fontSize: '0.9em' }}
          tickLine={false}
          type="category"
          width={100}
        />
        <Tooltip content={<TopRelayersTooltip currency={displayCurrency} />} />
        <Bar
          animationDuration={0}
          dataKey="volumeShare"
          fill={colors.indigo}
          onClick={handleBarClick}
          style={{ cursor: 'pointer' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

TopRelayersChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      relayer: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      trades: PropTypes.number.isRequired,
      volume: PropTypes.number.isRequired,
      volumeShare: PropTypes.number.isRequired,
    }),
  ).isRequired,
  displayCurrency: PropTypes.string.isRequired,
};

export default TopRelayersChart;
