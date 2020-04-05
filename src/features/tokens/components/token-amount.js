import PropTypes from 'prop-types';
import React from 'react';

import formatTokenAmount from '../../../util/format-token-amount';
import formatTokenSymbol from '../util/format-token-symbol';
import TokenLink from './token-link';

const TokenAmount = ({ amount, linked, token }) => {
  if (amount === null) {
    return 'Unknown';
  }

  return linked ? (
    <span title={`${amount} ${token.symbol}`}>
      {formatTokenAmount(amount)}{' '}
      <TokenLink address={token.address}>{token.symbol}</TokenLink>
    </span>
  ) : (
    `${formatTokenAmount(amount)} ${formatTokenSymbol(token.symbol)}`
  );
};

TokenAmount.propTypes = {
  amount: PropTypes.string.isRequired,
  linked: PropTypes.bool,
  token: PropTypes.shape({
    address: PropTypes.string,
    symbol: PropTypes.string.isRequired,
  }),
};

TokenAmount.defaultProps = {
  linked: true,
  token: undefined,
};

export default TokenAmount;
