import PropTypes from 'prop-types';

import { BASE_CURRENCY } from '../currencies/constants';

const relayerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

const statsShape = {
  share: PropTypes.number.isRequired,
  trades: PropTypes.number.isRequired,
  volume: PropTypes.shape({
    [BASE_CURRENCY]: PropTypes.number.isRequired,
  }).isRequired,
};

const propTypes = {
  relayer: PropTypes.shape(relayerShape),
  relayerWithStats: PropTypes.shape({
    ...relayerShape,
    stats: PropTypes.shape(statsShape),
  }),
};

export default propTypes;
