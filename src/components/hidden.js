import PropTypes from 'prop-types';

import useBreakpoint from '../hooks/use-breakpoint';

const Hidden = ({ above, at, children }) => {
  const breakpoint = useBreakpoint();

  if (at) {
    return at.includes(breakpoint.name) ? null : children;
  }

  if (above) {
    return breakpoint.greaterThan('above') ? null : children;
  }

  return null;
};

Hidden.propTypes = {
  above: PropTypes.string,
  at: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

export default Hidden;
