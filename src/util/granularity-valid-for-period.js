import getGranularityOptions from './get-granularity-options';

const granularityValidForPeriod = (granularity, period) =>
  getGranularityOptions(period).includes(granularity);

export default granularityValidForPeriod;
