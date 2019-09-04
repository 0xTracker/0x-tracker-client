import _ from 'lodash';
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
import buildTokenUrl from '../util/build-token-url';
import TopTokensTooltip from './top-tokens-tooltip';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const formatPercentage = value => `${numeral(value).format('0')}%`;

const TopTokensChart = ({ data, history }) => {
  const displayCurrency = useDisplayCurrency();

  if (_.isEmpty(data)) {
    return 'No data available';
  }

  const redirectToToken = token => {
    const url = buildTokenUrl(token.address);

    history.push(url);
  };

  const handleBarClick = ({ token }) => redirectToToken(token);

  const handleAxisClick = ({ value }) => {
    const { token } = _.find(data, { token: { symbol: value } });

    redirectToToken(token);
  };

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
        <XAxis
          axisLine={false}
          dataKey="token.symbol"
          onClick={handleAxisClick}
          style={{ cursor: 'pointer' }}
          tick={{ fill: 'currentColor', fontSize: '0.9em' }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          domain={[0, 100]}
          minTickGap={15}
          padding={{ bottom: 0, top: 25 }}
          tick={{ fill: 'currentColor', fontSize: '0.9em' }}
          tickFormatter={formatPercentage}
          tickLine={false}
          width={41}
        />
        <Tooltip content={<TopTokensTooltip currency={displayCurrency} />} />
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

TopTokensChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      share: PropTypes.number.isRequired,
      token: PropTypes.shape({
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
      }).isRequired,
      tokenVolume: PropTypes.string.isRequired,
      volume: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(TopTokensChart);
