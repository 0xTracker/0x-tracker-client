import _ from 'lodash';

const formatToken = amount => {
  const formatted =
    _.trimEnd(_.trimEnd(_.toNumber(amount.toString()).toFixed(6), '0'), '.') ||
    amount;

  return formatted;
};

export default formatToken;
