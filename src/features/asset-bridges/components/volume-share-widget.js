import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const VolumeShareWidget = ({ volumeShare, ...otherProps }) => (
  <StatWidget
    title="Bridging Dominance"
    tooltip="The percentage of trading volume sourced from asset bridging contracts rather than regular wallets in the selected period."
    {...otherProps}
  >
    {_.isNumber(volumeShare)
      ? `${numeral(volumeShare).format('0.[00]')}%`
      : loadingIndicator}
  </StatWidget>
);

VolumeShareWidget.propTypes = {
  volumeShare: PropTypes.number,
};

VolumeShareWidget.defaultProps = {
  volumeShare: undefined,
};

export default VolumeShareWidget;
