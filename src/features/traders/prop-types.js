import PropTypes from 'prop-types';

import { TRADER_TYPE } from './constants';

const traderShape = {
  trader: PropTypes.string.isRequired,
};

const statsShape = {
  fillCount: PropTypes.shape({
    maker: PropTypes.number.isRequired,
    taker: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  fillVolume: PropTypes.shape({
    maker: PropTypes.number.isRequired,
    taker: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

const propTypes = {
  trader: PropTypes.shape(traderShape),
  traderStats: PropTypes.shape(statsShape),
  traderType: PropTypes.oneOf(Object.values(TRADER_TYPE)),
  traderWithStats: PropTypes.shape({
    ...traderShape,
    stats: PropTypes.shape(statsShape),
  }),
};

export default propTypes;
