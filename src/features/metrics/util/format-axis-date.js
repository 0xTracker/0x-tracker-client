import numeral from 'numeral';

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

const formatAxisDate = (date, period, granularity) => {
  const parsedDate = new Date(date);
  const hour = parsedDate.getUTCHours();
  const month = parsedDate.getUTCMonth() + 1;
  const shortMonth = SHORT_MONTH_NAME[month];
  const day = parsedDate.getUTCDate();
  const suffixedDay = numeral(day).format('oO');
  const year = parsedDate.getUTCFullYear();

  if (period === 'day') {
    return `${hour}:00 (UTC)`;
  }

  if (period === 'week' && granularity === 'hour') {
    return `${shortMonth} ${suffixedDay}, ${hour}:00 (UTC)`;
  }

  if (period === 'week' && granularity === 'day') {
    return `${shortMonth} ${suffixedDay}`;
  }

  if (period === 'all') {
    return `${shortMonth} ${year}`;
  }

  return `${shortMonth} ${suffixedDay}`;
};

export default formatAxisDate;
