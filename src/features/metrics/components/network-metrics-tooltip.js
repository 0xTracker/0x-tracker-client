import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import ChartTooltip from '../../../components/chart-tooltip';
import formatDate from '../../../util/format-date';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const NetworkMetricsTooltip = ({ payload }) => {
  const displayCurrency = useDisplayCurrency();

  if (_.isEmpty(payload)) {
    return null;
  }

  const {
    date,
    fillCount,
    fillVolume,
    tradeCount,
    tradeVolume,
  } = payload[0].payload;

  return (
    <ChartTooltip
      items={[
        {
          label: 'Fill Count',
          value: <Number>{fillCount}</Number>,
        },
        {
          label: `Fill Volume (${displayCurrency})`,
          value: <LocalisedAmount amount={fillVolume} />,
        },
        {
          label: 'Trade Count',
          value: <Number>{tradeCount}</Number>,
        },
        {
          label: `Trade Volume (${displayCurrency})`,
          value: <LocalisedAmount amount={tradeVolume} />,
        },
      ]}
      title={formatDate(date, DATE_FORMAT.STANDARD)}
    />
  );
};

NetworkMetricsTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        date: PropTypes.string.isRequired,
        fillCount: PropTypes.number.isRequired,
        fillVolume: PropTypes.number.isRequired,
        tradeCount: PropTypes.number.isRequired,
        tradeVolume: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

NetworkMetricsTooltip.defaultProps = {
  payload: undefined,
};

export default NetworkMetricsTooltip;
