import getCurrencySymbol from './get-currency-symbol';
import summarizeNumber from './summarize-number';

const summarizeCurrency = (amount, currency) => {
  const currencySymbol = getCurrencySymbol(currency);
  const summarizedAmount = summarizeNumber(amount);

  return `${currencySymbol}${summarizedAmount}`;
};

export default summarizeCurrency;
