import createAsyncComponent from '../../../util/create-async-component';

const AsyncTraderBreakdownChart = createAsyncComponent(() =>
  import('./trader-breakdown-chart'),
);

export default AsyncTraderBreakdownChart;
