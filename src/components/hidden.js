import PropTypes from 'prop-types';

import { useCurrentBreakpoint } from '../responsive-utils';

const Hidden = ({ above, at, children }) => {
  const breakpoint = useCurrentBreakpoint();

  if (at) {
    return at.includes(breakpoint.name) ? null : children;
  }

  if (above) {
    return breakpoint.greaterThan(above) ? null : children;
  }

  return null;
};

Hidden.propTypes = {
  above: PropTypes.string,
  at: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

export default Hidden;
