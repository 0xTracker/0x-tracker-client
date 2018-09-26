import _ from 'lodash';
import { format as formatDate } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';

import ChartTooltip from '../../../components/chart-tooltip';
import formatCurrency from '../../../util/format-currency';
import formatToken from '../../../util/format-token';

const NetworkFeesTooltip = ({ currency, payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, fees, localizedFees } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: `fees (${currency})`,
          value: formatCurrency(localizedFees, currency),
        },
        {
          label: 'fees (ZRX)',
          value: `${formatToken(fees)} ZRX`,
        },
      ]}
      title={formatDate(date, 'MMMM Do YYYY, hh:mm A')}
    />
  );
};

NetworkFeesTooltip.propTypes = {
  currency: PropTypes.string.isRequired,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      fees: PropTypes.string.isRequired,
      localizedFees: PropTypes.number.isRequired,
    }),
  ),
};

NetworkFeesTooltip.defaultProps = {
  payload: undefined,
};

export default NetworkFeesTooltip;
