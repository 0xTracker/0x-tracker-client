import PropTypes from 'prop-types';

const appShape = {
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  description: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stats: PropTypes.shape({}).isRequired,
  urlSlug: PropTypes.string.isRequired,
};

const statsShape = {
  totalTrades: PropTypes.number.isRequired,
  totalVolume: PropTypes.number.isRequired,
};

const propTypes = {
  app: PropTypes.shape(appShape),
  appWithStats: PropTypes.shape({
    ...appShape,
    stats: PropTypes.shape(statsShape).isRequired,
  }),
};

export default propTypes;
