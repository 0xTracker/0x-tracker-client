import PropTypes from 'prop-types';

const tokenShape = {
  address: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.shape({
    lastPrice: PropTypes.object.isRequired,
    lastTrade: PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      id: PropTypes.string.isRequired,
    }).isRequired,
  }),
  symbol: PropTypes.string.isRequired,
};

const statsShape = {
  trades: PropTypes.number.isRequired,
  volume: PropTypes.object.isRequired,
};

const propTypes = {
  token: PropTypes.shape(tokenShape),
  tokenWithStats: PropTypes.shape({
    ...tokenShape,
    stats: PropTypes.shape(statsShape),
  }),
};

export default propTypes;
