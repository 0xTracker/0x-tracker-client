import { storiesOf } from '@storybook/react';
import PropTypes from 'prop-types';
import React from 'react';

import ChartsContainer from '../src/components/charts-container';
import TopRelayersChart from '../src/features/relayers/components/top-relayers-chart';

const ChartComponent = ({ period }) => {
  if (period) {
    console.log(`selected ${period}`);
  }

  return (
    <TopRelayersChart
      data={[
        { name: 'Radar Relay', share: 60, tradeCount: 512, volume: 120000 },
        { name: 'Paradex', share: 30, tradeCount: 210, volume: 48000 },
        { name: 'ERC dEX', share: 10, tradeCount: 100, volume: 10000 },
      ]}
      displayCurrency="USD"
    />
  );
};

ChartComponent.propTypes = {
  period: PropTypes.string,
};

ChartComponent.defaultProps = {
  period: undefined,
};

storiesOf('Layout|ChartsContainer', module)
  .addWithJSX('default', () => (
    <div css="padding: 20px; width: 680px;">
      <ChartsContainer
        charts={[
          { component: ChartComponent, title: 'Network Volume' },
          { component: ChartComponent, title: 'Network Fees' },
        ]}
      />
    </div>
  ))
  .addWithJSX('with time periods', () => (
    <div css="padding: 20px; width: 680px;">
      <ChartsContainer
        charts={[
          { component: ChartComponent, title: 'Network Volume' },
          { component: ChartComponent, title: 'Network Fees' },
        ]}
        periods={[
          { label: '24H', value: 'day' },
          { label: '7D', value: 'week' },
          { default: true, label: '1M', value: 'month' },
          { label: '1Y', value: 'year' },
          { label: 'ALL', value: 'all' },
        ]}
      />
    </div>
  ));
