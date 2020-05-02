import React from 'react';

import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PriceChange from '../../../components/price-change';
import StatWidget from '../../../components/stat-widget';
import useZrxPrice from '../hooks/use-zrx-price';

const ZRXPriceWidget = (props) => {
  const [zrxPrice, loading] = useZrxPrice({ autoReload: true });

  return (
    <StatWidget {...props} loading={loading} title="ZRX Price">
      {!loading && (
        <Link href="https://www.cryptocompare.com/coins/zrx/overview">
          <LocalisedAmount amount={zrxPrice.value} preferredPrecision={5} />
          <PriceChange>{zrxPrice.change}</PriceChange>
        </Link>
      )}
    </StatWidget>
  );
};

export default ZRXPriceWidget;
