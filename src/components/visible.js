import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Visible = ({ above, at, screen, children }) => {
  if (at) {
    return at.includes(screen.mediaType) ? children : null;
  }

  if (above) {
    return screen.greaterThan[above] ? children : null;
  }

  return null;
};

Visible.propTypes = {
  above: PropTypes.string,
  at: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  screen: PropTypes.shape({ mediaType: PropTypes.string.isRequired })
    .isRequired,
};

const mapStateToProps = state => ({ screen: state.screen });

export default connect(mapStateToProps)(Visible);
