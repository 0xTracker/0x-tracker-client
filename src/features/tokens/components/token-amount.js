import PropTypes from 'prop-types';
import React from 'react';

import formatToken from '../../../util/format-token';
import TokenLink from './token-link';

const TokenAmount = ({ amount, linked, token }) => {
  if (amount === null) {
    return 'Unknown';
  }

  return linked ? (
    <span title={`${amount} ${token.symbol}`}>
      {formatToken(amount)}{' '}
      <TokenLink address={token.address}>{token.symbol}</TokenLink>
    </span>
  ) : (
    `${formatToken(amount)} ${token.symbol}`
  );
};

TokenAmount.propTypes = {
  amount: PropTypes.string.isRequired,
  linked: PropTypes.bool,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
  }),
};

TokenAmount.defaultProps = {
  linked: true,
  token: undefined,
};

export default TokenAmount;
