import _ from 'lodash';

const formatTokenSymbol = symbol =>
  _.isString(symbol) ? _.toUpper(_.truncate(symbol, { length: 9 })) : symbol;

export default formatTokenSymbol;
