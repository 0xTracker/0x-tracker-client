import { setTestValue as setBreakpoint } from './breakpoint-context';
import Breakpoint from './breakpoint';
import MockBreakpointProvider from './mock-breakpoint-provider';

const setTestDefaults = (breakpoints, defaultBreakpoint) => {
  const breakpoint = new Breakpoint(breakpoints, defaultBreakpoint);
  MockBreakpointProvider.setDefaultBreakpoints(breakpoints);
  setBreakpoint(breakpoint);
};

export default setTestDefaults;
