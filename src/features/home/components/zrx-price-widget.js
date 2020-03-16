import {
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
} from 'styled-icons/material';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import Link from '../../../components/link';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import StatWidget from '../../../components/stat-widget';
import useZrxPrice from '../hooks/use-zrx-price';

const ZRXPriceWidget = ({ className }) => {
  const [zrxPrice, loading] = useZrxPrice({ autoReload: true });

  return (
    <StatWidget className={className} title="ZRX Price">
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
                height={20}
                width={20}
              />
            ) : null}
            {zrxPrice.change < 0 ? (
              <TrendingDownIcon
                color={colors.pomegranate}
                css="margin: 0 0 0 0.25rem;"
                height={20}
                width={20}
              />
            ) : null}
          </span>
        </Link>
      )}
    </StatWidget>
  );
};

ZRXPriceWidget.propTypes = {
  className: PropTypes.string,
};

ZRXPriceWidget.defaultProps = {
  className: undefined,
};

export default ZRXPriceWidget;
