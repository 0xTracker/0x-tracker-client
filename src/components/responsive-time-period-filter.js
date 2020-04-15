import React from 'react';

import { useCurrentBreakpoint } from '../responsive-utils';
import MobileTimePeriodFilter from './mobile-time-period-filter';
import TimePeriodFilter from './time-period-filter';

const ResponsiveTimePeriodFilter = (props) => {
  const breakpoint = useCurrentBreakpoint();

  if (breakpoint.lessThan('sm')) {
    return <MobileTimePeriodFilter {...props} />;
  }

  return <TimePeriodFilter {...props} />;
};

export default ResponsiveTimePeriodFilter;
