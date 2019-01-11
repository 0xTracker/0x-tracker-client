import { flow, map, orderBy } from 'lodash/fp';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { withRouter } from 'react-router';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import buildRelayerUrl from '../util/build-relayer-url';
import relayersPropTypes from '../prop-types';
import TopRelayersTooltip from './top-relayers-tooltip';

const formatXAxis = share => `${numeral(share).format('0.[00]')}%`;

const TopRelayersChart = ({ history, relayers, displayCurrency }) => {
  const data = flow([
    map(relayer => ({
      relayer,
      ...relayer.stats,
    })),
    orderBy(['share'], ['asc']),
  ])(relayers);

  const redirectToRelayer = relayer => {
    const url = buildRelayerUrl(relayer);

    history.push(url);
  };

  const handleAxisClick = ({ value }) => {
    const clickedRelayer = relayers.find(relayer => relayer.name === value);

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
          tickFormatter={formatXAxis}
          tickLine={false}
          type="number"
        />
        <YAxis
          axisLine={false}
          dataKey="relayer.name"
          onClick={handleAxisClick}
          style={{ cursor: 'pointer' }}
          tickLine={false}
          type="category"
          width={100}
        />
        <Tooltip content={<TopRelayersTooltip currency={displayCurrency} />} />
        <Bar
          animationDuration={0}
          dataKey="share"
          fill={colors.indigo}
          onClick={handleBarClick}
          style={{ cursor: 'pointer' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

TopRelayersChart.propTypes = {
  displayCurrency: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  relayers: PropTypes.arrayOf(relayersPropTypes.relayerWithStats).isRequired,
};

export default withRouter(TopRelayersChart);
