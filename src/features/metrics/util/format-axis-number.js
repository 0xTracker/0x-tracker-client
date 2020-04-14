import { summarizeNumber } from '../../../util';

const formatAxisNumber = (value) => {
  if (value === 0) {
    return '';
  }

  return summarizeNumber(value);
};

export default formatAxisNumber;
