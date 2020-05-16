import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import PriceChange from '../../../components/price-change';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const VolumeShareWidget = ({ change, volumeShare, ...otherProps }) => (
  <StatWidget
    title="Bridging Dominance"
    tooltip="The percentage of trading volume sourced from asset bridging contracts rather than regular wallets in the selected period."
    {...otherProps}
  >
    {_.isNumber(volumeShare) ? (
      <span css="align-items: baseline; display: flex;">
        {numeral(volumeShare).format('0.[00]')}%
        <PriceChange>{change}</PriceChange>
      </span>
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

VolumeShareWidget.propTypes = {
  change: PropTypes.number,
  volumeShare: PropTypes.number,
};

VolumeShareWidget.defaultProps = {
  change: undefined,
  volumeShare: undefined,
};

export default VolumeShareWidget;
