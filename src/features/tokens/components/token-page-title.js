import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PriceChange from '../../../components/price-change';
import TokenImage from './token-image';

const TokenPageTitle = ({ token }) => (
  <div css="align-items: center; display: flex;">
    {_.has(token, 'imageUrl') ? (
      <TokenImage
        css="margin-right: 0.75rem;"
        imageUrl={token.imageUrl}
        size="2rem"
      />
    ) : null}
    {_.has(token, 'name') ? token.name : `Token: ${token.address}`}
    {_.has(token, 'symbol') ? ` (${token.symbol.toUpperCase()})` : null}
    {token.price.last !== null ? (
      <span css="align-items: center; color: gray; display: flex; margin-left: 2rem;">
        <LocalisedAmount
          amount={token.price.last}
          css={`
            color: ${colors.stormGray};
          `}
        />{' '}
        {_.has(token, 'price.change') ? (
          <PriceChange css="display: flex; align-items: center;">
            {token.price.change}
          </PriceChange>
        ) : null}
      </span>
    ) : null}
  </div>
);

TokenPageTitle.propTypes = {
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.shape({
      change: PropTypes.number,
      last: PropTypes.number,
    }).isRequired,
    symbol: PropTypes.string,
  }).isRequired,
};

export default TokenPageTitle;
