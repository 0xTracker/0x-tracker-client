import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import { COLORS } from '../../../styles/constants';
import LocalisedAmount from '../../currencies/components/localised-amount';
import TokenAmount from './token-amount';

const TokenListItemVolume = ({ token }) => {
  const trades = _.get(token, 'stats.tradeCount', 0);
  const volume = _.get(token, 'stats.tradeVolume');

  if (trades === 0) {
    return '-';
  }

  return (
    <>
      <span css="display: block; line-height: 1; margin-bottom: 4px;">
        {volume[BASE_CURRENCY] === 0 || volume[BASE_CURRENCY] === null ? (
          'Unknown'
        ) : (
          <LocalisedAmount amount={volume[BASE_CURRENCY]} summarize />
        )}
      </span>
      <span
        css={`
          color: ${COLORS.NEUTRAL.MYSTIC_700};
          display: block;
          font-size: 12px;
          letter-spacing: 0.05em;
          line-height: 1;
        `}
      >
        {_.isNil(volume.token) ? (
          'Unknown'
        ) : (
          <TokenAmount
            amount={volume.token}
            linked={false}
            summarize
            token={token}
          />
        )}
      </span>
    </>
  );
};

TokenListItemVolume.propTypes = {
  token: PropTypes.object.isRequired,
};

export default TokenListItemVolume;
