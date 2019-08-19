import _ from 'lodash';
import { format as formatDate } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';

import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';

const AddressMetricsTooltip = ({ localCurrency, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, fillCount, fillVolume } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: 'fill count',
          value: fillCount,
        },
        {
          label: `fill volume (${localCurrency})`,
          value: formatCurrency(fillVolume, localCurrency),
        },
      ]}
      title={formatDate(date, 'MMMM Do YYYY, hh:mm A')}
    />
  );
};

AddressMetricsTooltip.propTypes = {
  localCurrency: PropTypes.string.isRequired,
  payload: PropTypes.array,
};

AddressMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default AddressMetricsTooltip;
