import { connect } from 'react-redux';
import { compose } from 'recompose';
import { TrendingDown as TrendingDownIcon } from 'styled-icons/material/TrendingDown.cjs';
import { TrendingUp as TrendingUpIcon } from 'styled-icons/material/TrendingUp.cjs';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import AutoReload from '../../../util/auto-reload';
import callApi from '../../../util/call-api';
import DashboardMetric from './dashboard-metric';
import formatCurrency from '../../../util/format-currency';
import Link from '../../../components/link';
import LoadingIndicator from '../../../components/loading-indicator';
import withConversionRate from '../../currencies/components/with-conversion-rate';

class ZRXPriceMetric extends React.PureComponent {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.loadData()
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(() => AutoReload.addListener(this.loadData))
      .catch(error => {
        this.setState({ error });
      });
  }

  componentDidUpdate(prevProps) {
    const { displayCurrency } = this.props;

    if (prevProps.displayCurrency !== displayCurrency) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    AutoReload.removeListener(this.loadData);
  }

  loadData = async () => {
    const { displayCurrency } = this.props;
    const zrxPrice = await callApi('zrx-price', { currency: displayCurrency });

    this.setState({ zrxPrice });
  };

  render() {
    const { className, displayCurrency } = this.props;
    const { error, zrxPrice } = this.state;

    if (error) {
      throw error;
    }

    return (
      <DashboardMetric className={className} title="ZRX Price">
        {zrxPrice === undefined ? (
          <LoadingIndicator size="small" type="cylon" />
        ) : (
          <Link
            css="color: currentColor;"
            href="https://www.cryptocompare.com/coins/zrx/overview"
          >
            {formatCurrency(zrxPrice.value, displayCurrency)}{' '}
            <span
              css={`
                color: ${zrxPrice.change > 0
                  ? colors.fruitSalad
                  : colors.pomegranate};
                margin-left: 0.5rem;
                font-size: 1rem;
              `}
            >
              {numeral(zrxPrice.change).format('0.[00]')}%
              {zrxPrice.change > 0 ? (
                <TrendingUpIcon
                  color={colors.fruitSalad}
                  css="margin: 0 0 0 0.25rem;"
                  height={24}
                  width={24}
                />
              ) : null}
              {zrxPrice.change < 0 ? (
                <TrendingDownIcon
                  color={colors.pomegranate}
                  css="margin: 0 0 0 0.25rem;"
                  height={24}
                  width={24}
                />
              ) : null}
            </span>
          </Link>
        )}
      </DashboardMetric>
    );
  }
}

ZRXPriceMetric.propTypes = {
  className: PropTypes.string,
  displayCurrency: PropTypes.string.isRequired,
};

ZRXPriceMetric.defaultProps = {
  className: undefined,
};

const mapStateToProps = state => ({
  displayCurrency: state.preferences.currency,
});

const enhance = compose(
  withConversionRate,
  connect(mapStateToProps),
);

export default enhance(ZRXPriceMetric);
