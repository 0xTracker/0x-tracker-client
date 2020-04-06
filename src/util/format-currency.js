import currencyFormatter from 'currency-formatter';

const formatCurrency = (amount, currency) => {
  switch (currency) {
    case 'BTC':
      return `Ƀ ${currencyFormatter.format(amount, {
        decimal: '.',
        precision: 8,
        thousand: ',',
      })}`;
    case 'ETH':
      return `Ξ ${currencyFormatter.format(amount, {
        decimal: '.',
        precision: 6,
        thousand: ',',
      })}`;
    case 'EUR':
      return currencyFormatter.format(amount, {
        decimal: ',',
        precision: 2,
        symbol: '€',
        thousand: '.',
      });
    case 'AUD':
      return currencyFormatter.format(amount, {
        precision: 2,
        symbol: 'A$',
      });
    default:
      if (amount < 1) {
        return currencyFormatter.format(amount, {
          code: currency,
          precision: 6,
          thousand: currency === 'EUR' ? '.' : ',',
        });
      }

      return currencyFormatter.format(amount, {
        code: currency,
        precision: 2,
        thousand: currency === 'EUR' ? '.' : ',',
      });
  }
};

export default formatCurrency;
