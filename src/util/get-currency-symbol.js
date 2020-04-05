import currencyFormatter from 'currency-formatter';

const getCurrencySymbol = (code) => {
  if (code === 'ETH') {
    return 'Ξ';
  }

  if (code === 'BTC') {
    return 'Ƀ';
  }

  if (code === 'AUD') {
    return 'A$';
  }

  const currency = currencyFormatter.findCurrency(code);

  return currency ? currency.symbol : undefined;
};

export default getCurrencySymbol;
