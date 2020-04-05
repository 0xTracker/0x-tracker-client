import prettyPeriod from './pretty-period';

const getPeriodOptions = (periods, defaultPeriod) =>
  periods.map((period) => ({
    default: defaultPeriod === period,
    label: prettyPeriod(period),
    value: period,
  }));

export default getPeriodOptions;
