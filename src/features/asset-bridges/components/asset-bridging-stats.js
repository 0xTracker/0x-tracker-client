import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import ActiveBridgesWidget from './active-bridges-widget';
import BridgedTradesWidget from './bridged-trades-widget';
import BridgedVolumeWidget from './bridged-volume-widget';
import VolumeShareWidget from './volume-share-widget';

// Carousel gets loaded lazily because it relies on react-slick
// const AsyncTokenStatsCarousel = React.lazy(() =>
//   import('./token-stats-carousel'),
// );

const AssetBridgingStats = ({ bridgeCount, trades, volume, volumeShare }) => {
  const breakpoint = useCurrentBreakpoint();

  return breakpoint.greaterThan('md') ? (
    <Row css="margin-bottom: 2rem;">
      <Col lg={3} md={6}>
        <BridgedVolumeWidget volume={volume} />
      </Col>
      <Col lg={3} md={6}>
        <VolumeShareWidget volumeShare={volumeShare} />
      </Col>
      <Col lg={3} md={6}>
        <BridgedTradesWidget tradeCount={trades} />
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
  trades: PropTypes.number,
  volume: PropTypes.number,
  volumeShare: PropTypes.number,
};

AssetBridgingStats.defaultProps = {
  bridgeCount: undefined,
  trades: undefined,
  volume: undefined,
  volumeShare: undefined,
};

export default AssetBridgingStats;
