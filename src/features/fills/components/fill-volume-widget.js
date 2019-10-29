import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const FillVolumeWidget = ({ className, fillVolume }) => (
  <StatWidget className={className} title="Fill Volume (24H)">
    {_.isNumber(fillVolume) ? (
      <LocalisedAmount
        amount={fillVolume}
        loadingIndicator={loadingIndicator}
      />
    ) : (
      undefined
    )}
  </StatWidget>
);

FillVolumeWidget.propTypes = {
  className: PropTypes.string,
  fillVolume: PropTypes.number,
};

FillVolumeWidget.defaultProps = {
  className: undefined,
  fillVolume: undefined,
};

export default FillVolumeWidget;
