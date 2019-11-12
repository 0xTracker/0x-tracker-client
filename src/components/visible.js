import PropTypes from 'prop-types';

import { useCurrentBreakpoint } from '../responsive-utils';

const Visible = ({ above, at, children }) => {
  const breakpoint = useCurrentBreakpoint();

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
