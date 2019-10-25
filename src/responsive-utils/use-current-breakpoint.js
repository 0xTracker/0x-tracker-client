import { useContext } from 'react';

import BreakpointContext from './breakpoint-context';

const useCurrentBreakpoint = () => {
  const currentBreakpoint = useContext(BreakpointContext);

  return currentBreakpoint;
};

export default useCurrentBreakpoint;
