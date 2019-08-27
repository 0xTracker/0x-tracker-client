import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import { colors } from '../../../styles/constants';
import formatTokenAmount from '../../../util/format-token-amount';
import LocalisedAmount from '../../currencies/components/localised-amount';
import TokenAmount from './token-amount';

const TokenListItemVolume = ({ token }) => {
  const fillCount = _.get(token, 'stats.fillCount', 0);
  const volume = _.get(token, 'stats.fillVolume');

  if (fillCount === 0) {
    return '-';
  }

  if (volume[BASE_CURRENCY] === 0) {
    if (_.isNil(volume.token)) {
      return 'Unknown';
    }

    return (
      <>
        {formatTokenAmount(volume.token)} {token.symbol}
      </>
    );
  }

  return (
    <>
      <LocalisedAmount amount={volume[BASE_CURRENCY]} />
      {volume.token && (
        <>
          <br />
          <span
            css={`
              color: ${colors.stormGray};
              font-size: 0.8rem;
            `}
          >
            <TokenAmount amount={volume.token} linked={false} token={token} />
          </span>
        </>
      )}
    </>
  );
};

TokenListItemVolume.propTypes = {
  token: PropTypes.object.isRequired,
};

export default TokenListItemVolume;
