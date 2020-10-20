import PropTypes from 'prop-types';

const appShape = {
  categories: PropTypes.arrayOf(PropTypes.string.isRequired),
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  logoUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  urlSlug: PropTypes.string.isRequired,
  websiteUrl: PropTypes.string,
};

const statsShape = {
  activeTraders: PropTypes.number.isRequired,
  activeTradersChange: PropTypes.number.isRequired,
  tradeCount: PropTypes.shape({
    relayed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  tradeCountChange: PropTypes.shape({
    relayed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  tradeVolume: PropTypes.shape({
    relayed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  tradeVolumeChange: PropTypes.shape({
    relayed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

const propTypes = {
  app: PropTypes.shape(appShape),
  appWithStats: PropTypes.shape({
    ...appShape,
    stats: PropTypes.shape(statsShape).isRequired,
  }),
};

export default propTypes;
