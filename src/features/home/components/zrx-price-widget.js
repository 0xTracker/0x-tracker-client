import React from 'react';

import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PercentageChange from '../../../components/percentage-change';
import StatWidget from '../../../components/stat-widget';
import useZrxPrice from '../hooks/use-zrx-price';

const ZRXPriceWidget = (props) => {
  const [zrxPrice, loading] = useZrxPrice({ autoReload: true });

  return (
    <StatWidget {...props} loading={loading} title="ZRX Price">
      {!loading && (
        <Link
          css="align-items: baseline; display: flex;"
          href="https://www.cryptocompare.com/coins/zrx/overview"
        >
          <LocalisedAmount amount={zrxPrice.value} preferredPrecision={5} />
          <PercentageChange>{zrxPrice.change}</PercentageChange>
        </Link>
      )}
    </StatWidget>
  );
};

export default ZRXPriceWidget;
