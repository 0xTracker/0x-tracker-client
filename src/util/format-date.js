import format from 'date-fns/format';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

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

const formatDate = (date, dateFormat) =>
  ({
    [DATE_FORMAT.FULL]: () =>
      format(new Date(date), 'EEEE, MMMM do Y, hh:mm:ss a'),
    [DATE_FORMAT.RELATIVE]: () =>
      `${formatDistanceStrict(new Date(date), new Date())} ago`,
    [DATE_FORMAT.COMPACT]: () =>
      `${SHORT_MONTHS[new Date(date).getUTCMonth()]} ${new Date(
        date,
      ).getUTCDate()}`,
    [DATE_FORMAT.STANDARD]: () =>
      format(new Date(date), 'MMMM do yyyy, hh:mm a'),
  }[dateFormat](date));

export default formatDate;
