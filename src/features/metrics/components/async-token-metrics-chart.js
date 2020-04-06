import createAsyncComponent from '../../../util/create-async-component';

const AsyncTokenMetricsChart = createAsyncComponent(() =>
  import('./token-metrics-chart'),
);

export default AsyncTokenMetricsChart;
