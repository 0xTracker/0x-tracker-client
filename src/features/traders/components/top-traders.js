import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import useTraders from '../hooks/use-traders';
import EntityList from '../../../components/entity-list';
import buildTraderUrl from '../util/build-trader-url';
import EntityListItem from '../../../components/entity-list-item';
import TraderImage from './trader-image';
import LocalisedAmount from '../../currencies/components/localised-amount';
import truncateAddress from '../../../util/truncate-address';

const TopTraders = ({ period, type }) => {
  const [traders, loading] = useTraders({
    autoReload: true,
    limit: 4,
    statsPeriod: period,
    type,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return (
    <EntityList>
      {traders.items.map((trader) => (
        <EntityListItem
          complement={
            <LocalisedAmount
              amount={trader.stats.tradeVolume[type || 'total']}
              css="font-weight: 500;"
              summarize
            />
          }
          image={
            <TraderImage
              address={trader.address}
              imageUrl={trader.imageUrl}
              size={40}
            />
          }
          key={trader.address}
          metadata={[
            { label: 'Address', value: truncateAddress(trader.address, 30) },
          ]}
          title={trader.name || 'Unknown Trader'}
          url={buildTraderUrl(trader.address)}
        />
      ))}
    </EntityList>
  );
};

TopTraders.propTypes = {
  period: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default TopTraders;
