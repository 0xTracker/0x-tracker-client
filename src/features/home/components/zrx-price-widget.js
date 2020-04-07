import PropTypes from 'prop-types';
import React from 'react';

import { ZRX_TOKEN } from '../../../constants';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PriceChange from '../../../components/price-change';
import StatWidget from '../../../components/stat-widget';
import TokenLink from '../../tokens/components/token-link';
import useZrxPrice from '../hooks/use-zrx-price';

const ZRXPriceWidget = ({ className }) => {
  const [zrxPrice, loading] = useZrxPrice({ autoReload: true });

  return (
    <StatWidget className={className} title="ZRX Price">
      {loading ? (
        <LoadingIndicator size="small" type="cylon" />
      ) : (
        <TokenLink address={ZRX_TOKEN.address} css="color: currentColor;">
          <LocalisedAmount amount={zrxPrice.last} />
          <PriceChange>{zrxPrice.change}</PriceChange>
        </TokenLink>
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
