import { storiesOf } from '@storybook/react';
import React from 'react';

import ReduxContext from '../src/components/redux-context';
import TopBar from '../src/components/top-bar';

const TopBarWithRedux = props => (
  <ReduxContext>
    <TopBar {...props} />
  </ReduxContext>
);

storiesOf('Layout|TopBar', module)
  .addWithJSX('default', () => (
    <TopBarWithRedux
      displayCurrency="USD"
      fees={22.5}
      tradeCount={12500}
      volume={1278000.95}
      zrxPrice={{ change: 15.6, value: 2.78 }}
    />
  ))
  .addWithJSX('with loading indicators', () => (
    <TopBarWithRedux displayCurrency="USD" />
  ))
  .addWithJSX('with negative price change', () => (
    <TopBarWithRedux
      displayCurrency="USD"
      zrxPrice={{ change: -15.6, value: 2.78 }}
    />
  ));
