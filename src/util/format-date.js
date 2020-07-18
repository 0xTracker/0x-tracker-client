import format from 'date-fns/format';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import numeral from 'numeral';

import { DATE_FORMAT } from '../constants';

const SHORT_MONTHS = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

const formatDate = (date, dateFormat, { timezone } = { timezone: true }) => {
  const parsedDate = new Date(date);

  return {
    [DATE_FORMAT.FULL]: () => format(parsedDate, 'EEEE, MMMM do Y, pppp'),
    [DATE_FORMAT.RELATIVE]: () =>
      `${formatDistanceStrict(parsedDate, new Date())} ago`,
    [DATE_FORMAT.COMPACT]: () =>
      `${SHORT_MONTHS[parsedDate.getUTCMonth()]} ${numeral(
        parsedDate.getUTCDate(),
      ).format('oO')}${timezone ? ' (UTC)' : ''}`,
    [DATE_FORMAT.STANDARD]: () => format(parsedDate, 'MMMM do yyyy, hh:mm a'),
  }[dateFormat](date);
};

export default formatDate;
