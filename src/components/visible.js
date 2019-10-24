import PropTypes from 'prop-types';

import useBreakpoint from '../hooks/use-breakpoint';

const Visible = ({ above, at, children }) => {
  const breakpoint = useBreakpoint();

  if (at) {
    return at.includes(breakpoint.name) ? children : null;
  }

  if (above) {
    return breakpoint.greaterThan(above) ? children : null;
  }

  return null;
};

Visible.propTypes = {
  above: PropTypes.string,
  at: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

export default Visible;
