import PropTypes from 'prop-types';

const relayerShape = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  url: PropTypes.string,
};

const statsShape = {
  fillCount: PropTypes.number.isRequired,
  fillVolume: PropTypes.number.isRequired,
  tradeCount: PropTypes.number.isRequired,
  tradeVolume: PropTypes.number.isRequired,
  traderCount: PropTypes.number.isRequired,
};

const propTypes = {
  relayer: PropTypes.shape(relayerShape),
  relayerWithStats: PropTypes.shape({
    ...relayerShape,
    stats: PropTypes.shape(statsShape).isRequired,
  }),
};

export default propTypes;
