import _ from 'lodash';

const trimTrailingZeroes = (amount) => _.trimEnd(_.trimEnd(amount, '0'), '.');

const formatRecursively = (amount, precision) => {
  if (_.isNil(amount)) {
    return null;
  }

  const numericAmount = _.toNumber(amount);

  if (Number.isNaN(numericAmount)) {
    return null;
  }

  if (numericAmount === 0) {
    return '0';
  }

  const formattedAmount = trimTrailingZeroes(numericAmount.toFixed(precision));

  if (formattedAmount === '0') {
    return formatRecursively(amount, precision + 1);
  }

  return Number(formattedAmount).toLocaleString('en', {
    maximumSignificantDigits: 21,
  });
};

const formatTokenAmount = (amount) => formatRecursively(amount, 6);

export default formatTokenAmount;
