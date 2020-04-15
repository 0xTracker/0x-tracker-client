import _ from 'lodash';
import currencyFormatter from 'currency-formatter';

function numZeroesAfterPoint(x) {
  if (x % 1 === 0) {
    return 0;
  }

  return -1 - Math.floor(Math.log10(x % 1));
}

const formatCurrency = (amount, currency, preferredPrecision = 2) => {
  const minPrecision = numZeroesAfterPoint(amount) + 1;
  const precision = _.clamp(
    minPrecision,
    minPrecision > preferredPrecision ? minPrecision : preferredPrecision,
    Infinity,
  );

  switch (currency) {
    case 'BTC':
      return `Ƀ ${currencyFormatter.format(amount, {
        decimal: '.',
        precision,
        thousand: ',',
      })}`;
    case 'ETH':
      return `Ξ ${currencyFormatter.format(amount, {
        decimal: '.',
        precision,
        thousand: ',',
      })}`;
    case 'EUR':
      return currencyFormatter.format(amount, {
        decimal: ',',
        precision,
        symbol: '€',
        thousand: '.',
      });
    case 'AUD':
      return currencyFormatter.format(amount, {
        precision,
        symbol: 'A$',
      });
    default:
      return currencyFormatter.format(amount, {
        code: currency,
        precision,
        thousand: currency === 'EUR' ? '.' : ',',
      });
  }
};

export default formatCurrency;
