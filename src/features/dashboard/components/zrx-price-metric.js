import { TrendingDown as TrendingDownIcon } from 'styled-icons/material/TrendingDown';
import { TrendingUp as TrendingUpIcon } from 'styled-icons/material/TrendingUp';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import DashboardMetric from './dashboard-metric';
import Link from '../../../components/link';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import useZrxPrice from '../hooks/use-zrx-price';

const ZRXPriceMetric = ({ className }) => {
  const [zrxPrice, loading] = useZrxPrice({ autoReload: true });

  return (
    <DashboardMetric className={className} title="ZRX Price">
      {loading ? (
        <LoadingIndicator size="small" type="cylon" />
      ) : (
        <Link
          css="color: currentColor;"
          href="https://www.cryptocompare.com/coins/zrx/overview"
        >
          <LocalisedAmount amount={zrxPrice.value} />
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
};

ZRXPriceMetric.propTypes = {
  className: PropTypes.string,
};

ZRXPriceMetric.defaultProps = {
  className: undefined,
};

export default ZRXPriceMetric;
