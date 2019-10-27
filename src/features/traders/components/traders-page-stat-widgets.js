import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import { useCurrentBreakpoint } from '../../../responsive-utils';
import StatWidget from '../../../components/stat-widget';
import useNetworkStats from '../../stats/hooks/use-network-stats';
import useTraderStats from '../../stats/hooks/use-trader-stats';
import LocalisedAmount from '../../currencies/components/localised-amount';
import LoadingIndicator from '../../../components/loading-indicator';

// Carousel gets loaded lazily because it relies on react-slick
// const AsyncHomePageMetricsCarousel = React.lazy(() =>
//   import('./home-page-metrics-carousel'),
// );

const TradersPageStatWidgets = ({ className, period }) => {
  const [networkStats] = useNetworkStats({ period });
  const [traderStats] = useTraderStats({ period });
  const breakpoint = useCurrentBreakpoint();

  const makerCount = _.get(traderStats, 'makerCount');
  const takerCount = _.get(traderStats, 'takerCount');
  const traderCount = _.get(traderStats, 'traderCount');
  const fillVolume = _.get(networkStats, 'volume');

  return breakpoint.greaterThan('md') ? (
    <Row className={className}>
      <Col lg={3} md={6}>
        <StatWidget title="Trader Count">
          {_.isNumber(traderCount)
            ? numeral(traderCount).format('0,0')
            : undefined}
        </StatWidget>
      </Col>
      <Col lg={3} md={6}>
        <StatWidget title="Maker Count">
          {_.isNumber(makerCount)
            ? numeral(makerCount).format('0,0')
            : undefined}
        </StatWidget>
      </Col>
      <Col lg={3} md={6}>
        <StatWidget title="Taker Count">
          {_.isNumber(takerCount)
            ? numeral(takerCount).format('0,0')
            : undefined}
        </StatWidget>
      </Col>
      <Col lg={3} md={6}>
        <StatWidget title="Fill Volume">
          {fillVolume ? (
            <LocalisedAmount
              amount={fillVolume}
              loadingIndicator={<LoadingIndicator size="small" type="cylon" />}
            />
          ) : (
            undefined
          )}
        </StatWidget>
      </Col>
    </Row>
  ) : (
    <div />
    // <AsyncHomePageMetricsCarousel
    //   className={className}
    //   tradeCount={tradeCount}
    //   traderCount={traderCount}
    //   tradeVolume={tradeVolume}
    // />
  );
};

TradersPageStatWidgets.propTypes = {
  className: PropTypes.string,
  period: PropTypes.string,
};

TradersPageStatWidgets.defaultProps = {
  className: undefined,
  period: undefined,
};

export default TradersPageStatWidgets;
