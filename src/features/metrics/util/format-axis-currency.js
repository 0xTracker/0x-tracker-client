import { summarizeCurrency } from '../../../util';

const formatAxisCurrency = (value, currency) => {
  if (value === 0) {
    return '';
  }

  return summarizeCurrency(value, currency);
};

export default formatAxisCurrency;
