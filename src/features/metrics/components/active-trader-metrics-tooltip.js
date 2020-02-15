import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import ChartTooltip from '../../../components/chart-tooltip';
import formatDate from '../../../util/format-date';
import Number from '../../../components/number';

const ActiveTraderMetricsTooltip = ({ payload }) => {
  if (_.isEmpty(payload)) {
    return null;
  }

  const { date, makerCount, takerCount, traderCount } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: 'Makers',
          value: <Number>{makerCount}</Number>,
        },
        {
          label: 'Takers',
          value: <Number>{takerCount}</Number>,
        },
        {
          label: 'Traders',
          value: <Number>{traderCount}</Number>,
        },
      ]}
      title={formatDate(date, DATE_FORMAT.STANDARD)}
    />
  );
};

ActiveTraderMetricsTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        makerCount: PropTypes.number.isRequired,
        takerCount: PropTypes.number.isRequired,
        traderCount: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

ActiveTraderMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default ActiveTraderMetricsTooltip;
