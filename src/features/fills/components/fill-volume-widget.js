import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import sharedPropTypes from '../../../prop-types';
import StatWidget from '../../../components/stat-widget';

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const FillVolumeWidget = ({ className, fillVolume, period }) => (
  <StatWidget className={className} period={period} title="Fill Volume">
    {_.isNumber(fillVolume) ? (
      <LocalisedAmount
        amount={fillVolume}
        loadingIndicator={loadingIndicator}
      />
    ) : (
      loadingIndicator
    )}
  </StatWidget>
);

FillVolumeWidget.propTypes = {
  className: PropTypes.string,
  fillVolume: PropTypes.number,
  period: sharedPropTypes.timePeriod,
};

FillVolumeWidget.defaultProps = {
  className: undefined,
  fillVolume: undefined,
  period: undefined,
};

export default FillVolumeWidget;
