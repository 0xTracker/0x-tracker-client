import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../../components/link';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PriceChange from '../../../components/price-change';
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
          <LocalisedAmount amount={zrxPrice.value} preferredPrecision={5} />
          <PriceChange>{zrxPrice.change}</PriceChange>
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
