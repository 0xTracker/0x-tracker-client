import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { summarizeNumber } from '../../../util';
import LoadingIndicator from '../../../components/loading-indicator';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const ActiveBridgesWidget = ({ bridgeCount, ...otherProps }) => (
  <StatWidget
    title="Active Bridges"
    tooltip="The total number of asset bridges which were used in the selected period."
    {...otherProps}
  >
    {_.isNumber(bridgeCount) ? summarizeNumber(bridgeCount) : loadingIndicator}
  </StatWidget>
);

ActiveBridgesWidget.propTypes = {
  bridgeCount: PropTypes.number,
};

ActiveBridgesWidget.defaultProps = {
  bridgeCount: undefined,
};

export default ActiveBridgesWidget;
