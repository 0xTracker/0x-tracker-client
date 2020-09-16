import _ from 'lodash';
import currencyFormatter from 'currency-formatter';

function numZeroesAfterPoint(x) {
  if (x % 1 === 0) {
    return 0;
  }

  return -1 - Math.floor(Math.log10(x % 1));
}

const formatCurrency = (amount, currency, preferredPrecision = 2) => {
  const minPrecision = amount > 1 ? 2 : numZeroesAfterPoint(amount) + 1;
  const precision = _.clamp(
    minPrecision,
    minPrecision > preferredPrecision ? minPrecision : preferredPrecision,
    Infinity,
  );

  let result;

  switch (currency) {
    case 'BTC':
      result = `Ƀ ${currencyFormatter.format(amount, {
        decimal: '.',
        precision,
        thousand: ',',
      })}`;
      break;
    case 'ETH':
      result = `Ξ ${currencyFormatter.format(amount, {
        decimal: '.',
        precision,
        thousand: ',',
      })}`;
      break;
    case 'EUR':
      result = currencyFormatter.format(amount, {
        decimal: ',',
        precision,
        symbol: '€',
        thousand: '.',
      });
      break;
    case 'AUD':
      result = currencyFormatter.format(amount, {
        precision,
        symbol: 'A$',
      });
      break;
    default:
      result = currencyFormatter.format(amount, {
        code: currency,
        precision,
        thousand: currency === 'EUR' ? '.' : ',',
      });
  }

  if (result.endsWith('.00')) {
    return result.substr(0, result.length - 3);
  }

  return result;
};

export default formatCurrency;
