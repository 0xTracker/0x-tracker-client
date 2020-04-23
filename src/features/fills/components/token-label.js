import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../../tokens/util/build-token-url';
import Link from '../../../components/link';

const TokenLabel = ({ condensed, linked, token, ...otherProps }) => {
  const assetLink =
    token.type === 'erc-721'
      ? `https://opensea.io/assets/${token.address}/${token.id}`
      : buildTokenUrl(token.address);

  const children = condensed ? (
    <>
      {token.symbol || 'Unknown'} {token.id && <>#{token.id}</>}
    </>
  ) : (
    <>
      {token.name || 'Unknown'} {token.id && <>#{token.id}</>}{' '}
      {token.symbol && <>({token.symbol})</>}
    </>
  );

  return linked ? (
    <Link href={assetLink} {...otherProps}>
      {children}
    </Link>
  ) : (
    <span {...otherProps}>{children}</span>
  );
};

TokenLabel.propTypes = {
  condensed: PropTypes.bool,
  linked: PropTypes.bool,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
    symbol: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

TokenLabel.defaultProps = {
  condensed: false,
  linked: true,
};

export default TokenLabel;
