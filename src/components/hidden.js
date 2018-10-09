import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Hidden = ({ above, at, screen, children }) => {
  if (at) {
    return at.includes(screen.mediaType) ? null : children;
  }

  if (above) {
    return screen.greaterThan[above] ? null : children;
  }

  return null;
};

Hidden.propTypes = {
  above: PropTypes.string,
  at: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  screen: PropTypes.shape({ mediaType: PropTypes.string.isRequired })
    .isRequired,
};

const mapStateToProps = state => ({ screen: state.screen });

export default connect(mapStateToProps)(Hidden);
