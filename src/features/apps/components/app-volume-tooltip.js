import PropTypes from 'prop-types';
import React from 'react';

import { getPeriodDescriptor } from '../../../util';
import LocalisedAmount from '../../currencies/components/localised-amount';

const AppVolumeTooltip = ({ appName, period, tradeVolume }) => {
  const { relayed } = tradeVolume;
  const sourced = tradeVolume.total - tradeVolume.relayed;
  const periodDescriptor = getPeriodDescriptor(period, { prefix: 'during' });

  if (relayed === 0) {
    return (
      <p>
        {appName}{' '}
        <strong>
          sourced <LocalisedAmount amount={sourced} summarize title={false} />{' '}
        </strong>{' '}
        of liquidity from 0x relayers {periodDescriptor}.
      </p>
    );
  }

  if (sourced === 0) {
    return (
      <p>
        {appName}{' '}
        <strong>
          relayed <LocalisedAmount amount={relayed} summarize title={false} />{' '}
        </strong>{' '}
        of trades {periodDescriptor}.
      </p>
    );
  }

  return (
    <p>
      {appName}{' '}
      <strong>
        relayed <LocalisedAmount amount={relayed} summarize title={false} />{' '}
      </strong>{' '}
      of trades and{' '}
      <strong>
        sourced <LocalisedAmount amount={sourced} summarize title={false} />
      </strong>{' '}
      of liquidity from other 0x relayers {periodDescriptor}.
    </p>
  );
};

AppVolumeTooltip.propTypes = {
  appName: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  tradeVolume: PropTypes.shape({
    relayed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default AppVolumeTooltip;
