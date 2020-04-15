import _ from 'lodash';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

import ChartTooltip from '../../../components/chart-tooltip';

const MONTH_NAME = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const SHORT_MONTH_NAME = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

const twoDigit = (value) => _.padStart(value, 2, 0);

const formatHour = (hour) => `${twoDigit(hour)}:00`;

const addDays = (date, days) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};

const formatDateForGranularity = (date, granularity) => {
  const year = date.getUTCFullYear();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const hour = date.getUTCHours();

  if (granularity === 'hour') {
    return `${MONTH_NAME[month]} ${numeral(day).format(
      '0o',
    )} ${year}, ${formatHour(hour)} (UTC)`;
  }

  if (granularity === 'day') {
    return `${MONTH_NAME[month]} ${numeral(day).format('0o')} ${year} (UTC)`;
  }

  if (granularity === 'week') {
    const endDate = addDays(date, 6);

    return `${SHORT_MONTH_NAME[month]} ${numeral(day).format('0o')} ${year} - ${
      SHORT_MONTH_NAME[endDate.getUTCMonth() + 1]
    } ${numeral(endDate.getUTCDate()).format(
      '0o',
    )} ${endDate.getUTCFullYear()} (UTC)`;
  }

  if (granularity === 'month') {
    return `${MONTH_NAME[month]} ${year} (UTC)`;
  }

  return null;
};

const MetricsChartTooltip = ({ date, granularity, items }) => (
  <ChartTooltip
    items={[
      {
        label: 'Date',
        value: formatDateForGranularity(new Date(date), granularity),
      },
    ].concat(items)}
  />
);

MetricsChartTooltip.propTypes = {
  date: PropTypes.string.isRequired,
  granularity: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default MetricsChartTooltip;
