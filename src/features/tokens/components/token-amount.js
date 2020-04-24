import PropTypes from 'prop-types';
import React from 'react';

import formatTokenAmount from '../../../util/format-token-amount';
import formatTokenSymbol from '../util/format-token-symbol';
import TokenLink from './token-link';
import summarizeNumber from '../../../util/summarize-number';

const TokenAmount = ({ amount, linked, summarize, token }) => {
  if (amount === null) {
    return 'Unknown';
  }

  const displayAmount = summarize
    ? summarizeNumber(amount)
    : formatTokenAmount(amount);

  const symbol =
    token.symbol !== null ? formatTokenSymbol(token.symbol) : 'TKN';

  return linked ? (
    <span title={`${amount} ${token.symbol}`}>
      {displayAmount} <TokenLink address={token.address}>{symbol}</TokenLink>
    </span>
  ) : (
    `${displayAmount} ${symbol}`
  );
};

TokenAmount.propTypes = {
  amount: PropTypes.string.isRequired,
  linked: PropTypes.bool,
  summarize: PropTypes.bool,
  token: PropTypes.shape({
    address: PropTypes.string,
    symbol: PropTypes.string.isRequired,
  }),
};

TokenAmount.defaultProps = {
  linked: true,
  summarize: false,
  token: undefined,
};

export default TokenAmount;
