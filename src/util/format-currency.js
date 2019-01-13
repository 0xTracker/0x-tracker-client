import currencyFormatter from 'currency-formatter';

const formatCurrency = (amount, currency, dropDecimals = false) => {
  switch (currency) {
    case 'BTC':
      return `Ƀ ${currencyFormatter.format(amount, {
        decimal: '.',
        precision: dropDecimals ? 0 : 8,
        thousand: ',',
      })}`;
    case 'ETH':
      return `Ξ ${currencyFormatter.format(amount, {
        decimal: '.',
        precision: dropDecimals ? 0 : 6,
        thousand: ',',
      })}`;
    case 'EUR':
      return currencyFormatter.format(amount, {
        decimal: ',',
        precision: dropDecimals ? 0 : 2,
        symbol: '€',
        thousand: '.',
      });
    case 'AUD':
      return currencyFormatter.format(amount, {
        precision: dropDecimals ? 0 : 2,
        symbol: 'A$',
      });
    default:
      if (amount < 1) {
        return currencyFormatter.format(amount, {
          code: currency,
          precision: dropDecimals ? 0 : 4,
          thousand: currency === 'EUR' ? '.' : ',',
        });
      }

      return currencyFormatter.format(amount, {
        code: currency,
        precision: dropDecimals ? 0 : 2,
        thousand: currency === 'EUR' ? '.' : ',',
      });
  }
};

export default formatCurrency;
