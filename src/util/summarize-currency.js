import numeral from 'numeral';

import getCurrencySymbol from './get-currency-symbol';
import summarizeNumber from './summarize-number';

const summarizeCurrency = (amount, currency) => {
  const currencySymbol = getCurrencySymbol(currency);
  const summarizedAmount =
    amount < 100 ? numeral(amount).format('0.[000]') : summarizeNumber(amount);

  return `${currencySymbol}${summarizedAmount}`;
};

export default summarizeCurrency;
