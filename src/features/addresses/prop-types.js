import PropTypes from 'prop-types';

const addressShape = {
  address: PropTypes.string.isRequired,
};

const statsShape = {
  fillCount: PropTypes.number.isRequired,
  fillVolume: PropTypes.number.isRequired,
};

const propTypes = {
  address: PropTypes.shape(addressShape),
  addressWithStats: PropTypes.shape({
    ...addressShape,
    stats: PropTypes.shape(statsShape),
  }),
};

export default propTypes;
