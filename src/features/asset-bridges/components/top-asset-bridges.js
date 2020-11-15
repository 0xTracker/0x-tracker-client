import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import AssetBridgeImage from './asset-bridge-image';
import LoadingIndicator from '../../../components/loading-indicator';
import useAssetBridges from '../hooks/use-asset-bridges';
import EntityList from '../../../components/entity-list';
import buildTraderUrl from '../../traders/util/build-trader-url';
import LocalisedAmount from '../../currencies/components/localised-amount';
import truncateAddress from '../../../util/truncate-address';
import EntityListItem from '../../../components/entity-list-item';

const TopAssetBridges = ({ period }) => {
  const [assetBridges, loading] = useAssetBridges({
    autoReload: true,
    limit: 4,
    statsPeriod: period,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return (
    <EntityList>
      {assetBridges.items.map((assetBridge) => (
        <EntityListItem
          complement={
            <LocalisedAmount
              amount={assetBridge.stats.tradeVolume}
              css="font-weight: 500;"
              summarize
            />
          }
          image={
            <AssetBridgeImage
              imageUrl={assetBridge.imageUrl}
              isPrivate={
                _.isString(assetBridge.name) &&
                assetBridge.name.startsWith('Private')
              }
              size={40}
            />
          }
          key={assetBridge.address}
          metadata={[
            {
              label: 'Address',
              value: truncateAddress(assetBridge.address, 30),
            },
          ]}
          title={assetBridge.name || 'Unknown Bridge'}
          url={buildTraderUrl(assetBridge.address)}
        />
      ))}
    </EntityList>
  );
};

TopAssetBridges.propTypes = {
  period: PropTypes.string.isRequired,
};

export default TopAssetBridges;
