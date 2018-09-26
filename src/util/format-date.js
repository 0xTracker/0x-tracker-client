import { distanceInWordsStrict, format } from 'date-fns';

import { DATE_FORMAT } from '../constants';

const formatDate = (date, dateFormat) =>
  ({
    [DATE_FORMAT.FULL]: () => format(date, 'dddd, MMMM Do YYYY, h:mm:ss a'),
    [DATE_FORMAT.RELATIVE]: () =>
      distanceInWordsStrict(new Date(date), new Date()),
  }[dateFormat](date));

export default formatDate;
