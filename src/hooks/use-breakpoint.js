import _ from 'lodash';
import { useEffect, useState } from 'react';
import MediaQuery from 'mediaquery';

const breakpoints = {
  xs: 575,
  sm: 767, // eslint-disable-line sort-keys
  md: 991, // eslint-disable-line sort-keys
  lg: 1199, // eslint-disable-line sort-keys
  xl: Infinity,
};

const breakpointPairs = _.sortBy(_.toPairs(breakpoints), 1);

class Breakpoint {
  constructor(name) {
    this.name = name;
    this.index = _.findIndex(breakpointPairs, { 0: name });
  }

  greaterThan(breakpoint) {
    return _.findIndex(breakpointPairs, { 0: breakpoint }) < this.index;
  }

  equalTo(breakpoint) {
    return this.name === breakpoint;
  }

  lessThan(breakpoint) {
    return _.findIndex(breakpointPairs, { 0: breakpoint }) > this.index;
  }
}

const mediaQueryLists = _.mapValues(
  MediaQuery.asObject(breakpoints),
  window.matchMedia,
);

const getCurrentBreakpoint = () => {
  const key = _.findKey(mediaQueryLists, 'matches');

  if (key === undefined) {
    return undefined;
  }

  return new Breakpoint(key);
};

const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getCurrentBreakpoint(),
  );

  useEffect(() => {
    const handlers = _.mapValues(mediaQueryLists, (mq, key) => event => {
      if (event.matches) {
        setCurrentBreakpoint(new Breakpoint(key));
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

  return currentBreakpoint;
};

export default useBreakpoint;
