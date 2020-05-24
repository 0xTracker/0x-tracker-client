import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import ActiveBridgesWidget from './active-bridges-widget';
import BridgedTradesWidget from './bridged-trades-widget';
import BridgedVolumeWidget from './bridged-volume-widget';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import useAssetBridgingStats from '../hooks/use-asset-bridging-stats';
import VolumeShareWidget from './volume-share-widget';

const AssetBridgingStats = ({ period }) => {
  const [stats, loading] = useAssetBridgingStats(period);
  const breakpoint = useCurrentBreakpoint();

  if (breakpoint.greaterThan('md')) {
    return (
      <CardGridRow minHeight="80px">
        <CardGridCol lg={3} md={6}>
          <BridgedVolumeWidget
            change={_.get(stats, 'tradeVolumeChange')}
            loading={loading}
            volume={_.get(stats, 'tradeVolume')}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <VolumeShareWidget
            change={_.get(stats, 'tradeVolumeShareChange')}
            loading={loading}
            volumeShare={_.get(stats, 'tradeVolumeShare')}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <BridgedTradesWidget
            change={_.get(stats, 'tradeCountChange')}
            loading={loading}
            tradeCount={_.get(stats, 'tradeCount')}
          />
        </CardGridCol>
        <CardGridCol lg={3} md={6}>
          <ActiveBridgesWidget
            bridgeCount={_.get(stats, 'bridgeCount')}
            loading={loading}
          />
        </CardGridCol>
      </CardGridRow>
    );
  }

  return null;
};

AssetBridgingStats.propTypes = {
  period: PropTypes.string.isRequired,
};

export default AssetBridgingStats;
