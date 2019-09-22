import { formatDistanceStrict, format } from 'date-fns';

import { DATE_FORMAT } from '../constants';

const formatDate = (date, dateFormat) =>
  ({
    [DATE_FORMAT.FULL]: () =>
      format(new Date(date), 'EEEE, MMMM do Y, hh:mm:ss a'),
    [DATE_FORMAT.RELATIVE]: () =>
      `${formatDistanceStrict(new Date(date), new Date())} ago`,
    [DATE_FORMAT.COMPACT]: () => format(new Date(date), 'MMM DD'),
    [DATE_FORMAT.STANDARD]: () =>
      format(new Date(date), 'MMMM Do YYYY, hh:mm A'),
  }[dateFormat](date));

export default formatDate;
