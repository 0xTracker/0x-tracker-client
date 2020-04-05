import PropTypes from 'prop-types';
import React from 'react';

import { getBreakpointContext } from './breakpoint-context';
import Breakpoint from './breakpoint';

let defaultBreakpoints;

const MockBreakpointProvider = ({ breakpoints, children, value }) => {
  const breakpoint = new Breakpoint(breakpoints || defaultBreakpoints, value);
  const BreakpointContext = getBreakpointContext();

  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
};

MockBreakpointProvider.setDefaultBreakpoints = (breakpoints) => {
  defaultBreakpoints = breakpoints;
};

MockBreakpointProvider.propTypes = {
  breakpoints: PropTypes.object,
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
};

MockBreakpointProvider.defaultProps = {
  breakpoints: undefined,
};

export default MockBreakpointProvider;
