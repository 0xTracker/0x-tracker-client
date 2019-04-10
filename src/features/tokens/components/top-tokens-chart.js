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
import React, { PureComponent } from 'react';

import { colors } from '../../../styles/constants';
import buildTokenUrl from '../util/build-token-url';
import formatCurrency from '../../../util/format-currency';
import TopTokensTooltip from './top-tokens-tooltip';

const formatPercentage = value => `${numeral(value).format('0')}%`;

class TopTokensChart extends PureComponent {
  constructor() {
    super();

    this.formatCurrency = this.formatCurrency.bind(this);
    this.handleAxisClick = this.handleAxisClick.bind(this);
    this.handleBarClick = this.handleBarClick.bind(this);
  }

  formatCurrency(value) {
    const { displayCurrency } = this.props;

    return formatCurrency(value, displayCurrency);
  }

  redirectToToken(token) {
    const { history } = this.props;
    const url = buildTokenUrl(token.address);

    history.push(url);
  }

  handleAxisClick({ value }) {
    const { data } = this.props;
    const { token } = _.find(data, { token: { symbol: value } });

    this.redirectToToken(token);
  }

  handleBarClick({ token }) {
    this.redirectToToken(token);
  }

  render() {
    const { data, displayCurrency } = this.props;

    return (
      <ResponsiveContainer>
        <BarChart data={data} margin={{ bottom: 0, left: 0, right: 0, top: 0 }}>
          <XAxis
            axisLine={false}
            dataKey="token.symbol"
            onClick={this.handleAxisClick}
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
            onClick={this.handleBarClick}
            style={{ cursor: 'pointer' }}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

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
  displayCurrency: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(TopTokensChart);
