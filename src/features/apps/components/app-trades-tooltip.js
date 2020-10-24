import PropTypes from 'prop-types';
import React from 'react';

import { getPeriodDescriptor } from '../../../util';
import Number from '../../../components/number';

const AppTradesTooltip = ({ appName, period, tradeCount }) => {
  const { relayed } = tradeCount;
  const sourced = tradeCount.total - tradeCount.relayed;
  const periodDescriptor = getPeriodDescriptor(period, { prefix: 'during' });

  if (relayed === 0) {
    return (
      <p>
        {appName}{' '}
        <strong>
          sourced liquidity for{' '}
          <Number summarize title={false}>
            {sourced}
          </Number>
        </strong>{' '}
        trades from 0x relayers {periodDescriptor}.
      </p>
    );
  }

  if (sourced === 0) {
    return (
      <p>
        {appName}{' '}
        <strong>
          relayed{' '}
          <Number summarize title={false}>
            {relayed}
          </Number>
        </strong>{' '}
        trades {periodDescriptor}.
      </p>
    );
  }

  return (
    <p>
      {appName}{' '}
      <strong>
        relayed{' '}
        <Number summarize title={false}>
          {relayed}
        </Number>
      </strong>{' '}
      trades and{' '}
      <strong>
        sourced liquidity for{' '}
        <Number summarize title={false}>
          {sourced}
        </Number>
      </strong>{' '}
      trades from other relayers {periodDescriptor}.
    </p>
  );
};

AppTradesTooltip.propTypes = {
  appName: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  tradeCount: PropTypes.shape({
    relayed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default AppTradesTooltip;
