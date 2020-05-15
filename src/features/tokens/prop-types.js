import PropTypes from 'prop-types';

const tokenShape = {
  address: PropTypes.string.isRequired,
  circulatingSupply: PropTypes.number,
  imageUrl: PropTypes.string,
  lastTrade: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.string.isRequired,
  }),
  marketCap: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.shape({
    change: PropTypes.number,
    close: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    open: PropTypes.number,
  }).isRequired,
  symbol: PropTypes.string,
  totalSupply: PropTypes.number,
  type: PropTypes.string.isRequired,
};

const statsShape = {
  fillCount: PropTypes.number.isRequired,
  fillVolume: {
    USD: PropTypes.number.isRequired,
    token: PropTypes.number.isRequired,
  },
  tradeCount: PropTypes.number.isRequired,
  tradeVolume: {
    USD: PropTypes.number.isRequired,
    token: PropTypes.number.isRequired,
  },
};

const propTypes = {
  token: PropTypes.shape(tokenShape),
  tokenType: PropTypes.string,
  tokenWithStats: PropTypes.shape({
    ...tokenShape,
    stats: PropTypes.shape(statsShape),
  }),
};

export default propTypes;
