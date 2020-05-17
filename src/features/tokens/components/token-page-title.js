import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { TIME_PERIOD } from '../../../constants';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import SubTitle from '../../../components/sub-title';
import TokenImage from './token-image';
import TokenPriceTooltip from './token-price-tooltip';
import Tooltip from '../../../components/tooltip';
import Visible from '../../../components/visible';

const PriceWrapper = styled.span`
  align-items: center;
  color: ${COLORS.NEUTRAL.MYSTIC_700};
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
        size="35px"
      />
    )}
    <span>
      {_.isString(token.name) ? token.name : `Token: ${token.address}`}
      {_.isString(token.symbol) && ` (${token.symbol.toUpperCase()})`}
      <SubTitle>{periodDescriptions[statsPeriod]}</SubTitle>
    </span>
    {_.isFinite(token.price.close) && (
      <Visible above="sm">
        <Tooltip
          content={
            <TokenPriceTooltip period={statsPeriod} price={token.price} />
          }
        >
          <PriceWrapper>
            <LocalisedAmount amount={token.price.close} />
            {_.isFinite(token.price.change) && (
              <>
                {' '}
                <PercentageChange css="display: flex; align-items: center;">
                  {token.price.change}
                </PercentageChange>
              </>
            )}
          </PriceWrapper>
        </Tooltip>
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
      close: PropTypes.number,
    }).isRequired,
    symbol: PropTypes.string,
  }).isRequired,
};

export default TokenPageTitle;
