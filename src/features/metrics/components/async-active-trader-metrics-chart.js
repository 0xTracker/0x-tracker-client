import createAsyncComponent from '../../../util/create-async-component';

const AsyncActiveTraderMetricsChart = createAsyncComponent(() =>
  import('./active-trader-metrics-chart'),
);

export default AsyncActiveTraderMetricsChart;
