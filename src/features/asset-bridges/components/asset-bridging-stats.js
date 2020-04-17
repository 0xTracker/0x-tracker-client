import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import ActiveBridgesWidget from './active-bridges-widget';
import BridgedTradesWidget from './bridged-trades-widget';
import BridgedVolumeWidget from './bridged-volume-widget';
import useAssetBridgingStats from '../hooks/use-asset-bridging-stats';
import VolumeShareWidget from './volume-share-widget';

// Carousel gets loaded lazily because it relies on react-slick
// const AsyncTokenStatsCarousel = React.lazy(() =>
//   import('./token-stats-carousel'),
// );

const AssetBridgingStats = ({ bridgeCount, period }) => {
  const [stats] = useAssetBridgingStats(period);
  const breakpoint = useCurrentBreakpoint();

  return breakpoint.greaterThan('md') ? (
    <Row css="margin-bottom: 2rem;">
      <Col lg={3} md={6}>
        <BridgedVolumeWidget volume={_.get(stats, 'tradeVolume')} />
      </Col>
      <Col lg={3} md={6}>
        <VolumeShareWidget volumeShare={_.get(stats, 'tradeVolumeShare')} />
      </Col>
      <Col lg={3} md={6}>
        <BridgedTradesWidget tradeCount={_.get(stats, 'tradeCount')} />
      </Col>
      <Col lg={3} md={6}>
        <ActiveBridgesWidget bridgeCount={bridgeCount} />
      </Col>
    </Row>
  ) : null;
  // <AsyncTokenStatsCarousel token={token} />
};

AssetBridgingStats.propTypes = {
  bridgeCount: PropTypes.number,
  period: PropTypes.string.isRequired,
};

AssetBridgingStats.defaultProps = {
  bridgeCount: undefined,
};

export default AssetBridgingStats;
