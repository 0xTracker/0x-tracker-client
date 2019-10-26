import _ from 'lodash';
import MediaQuery from 'mediaquery';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getBreakpointContext } from './breakpoint-context';
import Breakpoint from './breakpoint';

const getInitialBreakpoint = (breakpoints, mediaQueryLists) => {
  const key = _.findKey(mediaQueryLists, 'matches');

  if (key === undefined) {
    return undefined;
  }

  return new Breakpoint(breakpoints, key);
};

const BreakpointProvider = ({ breakpoints, children }) => {
  const mediaQueries = MediaQuery.asObject(breakpoints);
  const mediaQueryLists = _.mapValues(mediaQueries, window.matchMedia);
  const initialBreakpoint = getInitialBreakpoint(breakpoints, mediaQueryLists);
  const [currentBreakpoint, setCurrentBreakpoint] = useState(initialBreakpoint);
  const BreakpointContext = getBreakpointContext();

  useEffect(() => {
    const handlers = _.mapValues(mediaQueryLists, (mq, key) => event => {
      if (event.matches) {
        setCurrentBreakpoint(new Breakpoint(breakpoints, key));
      }
    });

    _.forEach(mediaQueryLists, (mql, breakpoint) => {
      mql.addListener(handlers[breakpoint]);
    });

    return () => {
      _.forEach(mediaQueryLists, (mql, breakpoint) => {
        mql.removeListener(handlers[breakpoint]);
      });
    };
  }, []);

  return (
    <BreakpointContext.Provider value={currentBreakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
};

BreakpointProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  breakpoints: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default BreakpointProvider;
