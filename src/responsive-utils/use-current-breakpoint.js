import { useContext } from 'react';

import { getBreakpointContext } from './breakpoint-context';

const useCurrentBreakpoint = () => {
  const context = getBreakpointContext();
  const currentBreakpoint = useContext(context);

  return currentBreakpoint;
};

export default useCurrentBreakpoint;
