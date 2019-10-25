import _ from 'lodash';

class Breakpoint {
  constructor(breakpoints, name) {
    this.name = name;
    this.breakpointPairs = _.sortBy(_.toPairs(breakpoints), 1);
    this.index = _.findIndex(this.breakpointPairs, { 0: name });
  }

  greaterThan(breakpoint) {
    return _.findIndex(this.breakpointPairs, { 0: breakpoint }) < this.index;
  }

  equalTo(breakpoint) {
    return this.name === breakpoint;
  }

  lessThan(breakpoint) {
    return _.findIndex(this.breakpointPairs, { 0: breakpoint }) > this.index;
  }
}

export default Breakpoint;
