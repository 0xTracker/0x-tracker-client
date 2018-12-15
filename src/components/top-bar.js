import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import { colors } from '../styles/constants';
import Container from './container';
import formatCurrency from '../util/format-currency';
import LocalisedAmount from '../features/currencies/components/localised-amount';
import LoadingIndicator from './loading-indicator';
import TopBarCurrencySelector from './top-bar-currency-selector';
import TopBarStat from './top-bar-stat';
import Visible from './visible';

const StyledTopBar = styled.div`
  background-color: ${colors.mineShaft};
  color: ${colors.white};
  line-height: 1.2;
  height: 50px;
  padding: 9px 0;
`;

const TopBarContainer = styled(Container)`
  ${media.greaterThan('lg')`
    display: flex;
    justify-content: space-between;
  `};
`;

const TopBarStats = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.greaterThan('lg')`
    flex-grow: 1;
    justify-content: flex-start;
  `};
`;

const TopBar = ({
  displayCurrency,
  fees,
  onCurrencyChange,
  tradeCount,
  volume,
  zrxPrice,
}) => {
  const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

  return (
    <StyledTopBar>
      <TopBarContainer>
        <TopBarStats>
          <TopBarStat title="Network Volume (24H)">
            {_.isNumber(volume) ? (
              <LocalisedAmount
                amount={volume}
                loadingIndicator={loadingIndicator}
              />
            ) : (
              loadingIndicator
            )}
          </TopBarStat>
          <TopBarStat title="Network Fees (24H)">
            {_.isNumber(fees) ? (
              <LocalisedAmount
                amount={fees}
                loadingIndicator={loadingIndicator}
              />
            ) : (
              loadingIndicator
            )}
          </TopBarStat>
          <TopBarStat title="Trades (24H)">
            {_.isNumber(tradeCount)
              ? numeral(tradeCount).format('0,0')
              : loadingIndicator}
          </TopBarStat>
          <Visible above="sm">
            <TopBarStat title="ZRX Price">
              {zrxPrice === undefined ? (
                loadingIndicator
              ) : (
                <React.Fragment>
                  {formatCurrency(zrxPrice.value, displayCurrency)}{' '}
                  <span
                    className={`text-${
                      zrxPrice.change < 0 ? 'danger' : 'success'
                    }`}
                  >
                    ({`${numeral(zrxPrice.change).format('0.[00]')}%`})
                  </span>
                </React.Fragment>
              )}
            </TopBarStat>
          </Visible>
        </TopBarStats>
        <TopBarCurrencySelector onChange={onCurrencyChange} />
      </TopBarContainer>
    </StyledTopBar>
  );
};

TopBar.propTypes = {
  displayCurrency: PropTypes.string.isRequired,
  fees: PropTypes.number,
  onCurrencyChange: PropTypes.func.isRequired,
  tradeCount: PropTypes.number,
  volume: PropTypes.number,
  zrxPrice: PropTypes.shape({
    change: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }),
};

TopBar.defaultProps = {
  fees: undefined,
  tradeCount: undefined,
  volume: undefined,
  zrxPrice: undefined,
};

export default TopBar;
