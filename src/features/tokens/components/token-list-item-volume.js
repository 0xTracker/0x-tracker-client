import React from 'react';

import { BASE_CURRENCY } from '../../currencies/constants';
import { colors } from '../../../styles/constants';
import formatToken from '../../../util/format-token';
import LocalisedAmount from '../../currencies/components/localised-amount';
import TokenAmount from './token-amount';
import tokenPropTypes from '../prop-types';

const TokenListItemVolume = ({ token }) => {
  if (token.trades === 0) {
    return '-';
  }

  if (token.volume[BASE_CURRENCY] === 0) {
    return (
      <>
        {formatToken(token.volume[token.symbol])} {token.symbol}
      </>
    );
  }

  return (
    <>
      <LocalisedAmount amount={token.volume[BASE_CURRENCY]} />
      <br />
      <span
        css={`
          color: ${colors.stormGray};
          font-size: 0.8rem;
        `}
      >
        <TokenAmount
          amount={token.volume[token.symbol]}
          linked={false}
          token={token}
        />
      </span>
    </>
  );
};

TokenListItemVolume.propTypes = {
  token: tokenPropTypes.token.isRequired,
};

export default TokenListItemVolume;
