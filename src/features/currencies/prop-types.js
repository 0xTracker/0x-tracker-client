import PropTypes from 'prop-types';

import { CURRENCIES } from './constants';

const currencyPropType = PropTypes.oneOf(
  CURRENCIES.map((currency) => currency.symbol),
);

const propTypes = { currency: currencyPropType };

export default propTypes;
