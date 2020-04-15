import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { TIME_PERIOD } from '../../../constants';
import Hidden from '../../../components/hidden';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PriceChange from '../../../components/price-change';
import SubTitle from '../../../components/sub-title';
import TokenImage from './token-image';
import Visible from '../../../components/visible';

const PriceWrapper = styled.span`
  align-items: center;
  color: ${colors.stormGray};
  display: flex;
  margin-left: 2rem;
`;

const periodDescriptions = {
  [TIME_PERIOD.DAY]: 'for the last 24 hours',
  [TIME_PERIOD.WEEK]: 'for the past week',
  [TIME_PERIOD.MONTH]: 'for the past month',
  [TIME_PERIOD.YEAR]: 'for the past year',
  [TIME_PERIOD.ALL]: 'for all time',
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const TokenPageTitle = ({ statsPeriod, token }) => (
  <Wrapper>
    {_.isString(token.imageUrl) && (
      <TokenImage
        css="margin-right: 0.75rem;"
        imageUrl={token.imageUrl}
        size="2rem"
      />
    )}
    <span>
      {_.isString(token.name) ? token.name : `Token: ${token.address}`}
      {_.isString(token.symbol) && ` (${token.symbol.toUpperCase()})`}
      <Hidden above="xs">
        <SubTitle>{periodDescriptions[statsPeriod]}</SubTitle>
      </Hidden>
    </span>
    {_.isFinite(token.price.last) && (
      <Visible above="sm">
        <PriceWrapper>
          <LocalisedAmount amount={token.price.last} />
          {_.isFinite(token.price.change) && (
            <>
              {' '}
              <PriceChange css="display: flex; align-items: center;">
                {token.price.change}
              </PriceChange>
            </>
          )}
        </PriceWrapper>
      </Visible>
    )}
  </Wrapper>
);

TokenPageTitle.propTypes = {
  statsPeriod: PropTypes.string.isRequired,
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
