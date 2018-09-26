import _ from 'lodash';

const formatToken = amount => {
  const formatted =
    _.trimEnd(_.trimEnd(_.toNumber(amount.toString()).toFixed(5), '0'), '.') ||
    amount;

  return formatted;
};

export default formatToken;
