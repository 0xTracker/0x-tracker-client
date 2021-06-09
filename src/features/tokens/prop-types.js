import PropTypes from 'prop-types';

const tokenShape = {
  address: PropTypes.string.isRequired,
  circulatingSupply: PropTypes.number,
  imageUrl: PropTypes.string,
  lastTrade: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    id: PropTypes.string.isRequired,
  }),
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
