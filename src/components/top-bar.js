import _ from 'lodash';
import { css, StyleSheet } from 'aphrodite';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import Container from './container';
import CurrencySelector from '../features/currencies/components/currency-selector';
import formatCurrency from '../util/format-currency';
import LocalisedAmount from '../features/currencies/components/localised-amount';
import media from '../styles/media';
import TopBarLoadingIndicator from './top-bar-loading-indicator';

const styles = StyleSheet.create({
  container: {
    [media.desktop]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  stat: {
    fontSize: '13px',
    textTransform: 'uppercase',
    [media.desktop]: {
      marginRight: '50px',
      ':last-child': {
        marginRight: 0,
      },
    },
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    [media.desktop]: {
      flexGrow: 1,
      justifyContent: 'flex-start',
    },
  },
  statLabel: {
    fontWeight: 'bold',
  },
  statValue: {
    color: 'rgb(136, 135, 135)',
  },
  topBar: {
    backgroundColor: '#222',
    color: 'white',
    fontFamily: 'Monda',
    padding: '9px 0',
    lineHeight: 1.2,
    height: '50px',
  },
  zrxPrice: {
    display: 'none',
    [media.desktop]: {
      display: 'block',
    },
  },
});

const TopBar = ({
  displayCurrency,
  fees,
  onCurrencyChange,
  tradeCount,
  volume,
  zrxPrice,
}) => (
  <div className={css(styles.topBar)}>
    <Container styles={styles.container}>
      <div className={css(styles.stats)}>
        <div className={css(styles.stat)}>
          <span className={css(styles.statLabel)}>Network Volume (24H)</span>
          <br />
          <span className={css(styles.statValue)}>
            {_.isNumber(volume) ? (
              <LocalisedAmount
                amount={volume}
                loadingIndicator={<TopBarLoadingIndicator />}
              />
            ) : (
              <TopBarLoadingIndicator />
            )}
          </span>
        </div>
        <div className={css(styles.stat)}>
          <span className={css(styles.statLabel)}>Network Fees (24H)</span>
          <br />
          <span className={css(styles.statValue)}>
            {_.isNumber(fees) ? (
              <LocalisedAmount
                amount={fees}
                loadingIndicator={<TopBarLoadingIndicator />}
              />
            ) : (
              <TopBarLoadingIndicator />
            )}
          </span>
        </div>
        <div className={css(styles.stat)}>
          <span className={css(styles.statLabel)}>Trades (24H)</span>
          <br />
          <span className={css(styles.statValue)}>
            {_.isNumber(tradeCount) ? (
              numeral(tradeCount).format('0,0')
            ) : (
              <TopBarLoadingIndicator />
            )}
          </span>
        </div>
        <div className={css(styles.stat, styles.zrxPrice)}>
          <span className={css(styles.statLabel)}>ZRX Price</span>
          <br />
          <span className={css(styles.statValue)}>
            {zrxPrice === undefined ? (
              <TopBarLoadingIndicator />
            ) : (
              <span>
                {formatCurrency(zrxPrice.value, displayCurrency)}{' '}
                <span
                  className={`text-${
                    zrxPrice.change < 0 ? 'danger' : 'success'
                  }`}
                >
                  ({`${numeral(zrxPrice.change).format('0.[00]')}%`})
                </span>
              </span>
            )}
          </span>
        </div>
      </div>
      <CurrencySelector onChange={onCurrencyChange} variant="top-bar" />
    </Container>
  </div>
);

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
