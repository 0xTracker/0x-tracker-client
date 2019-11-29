import createAsyncComponent from '../../../util/create-async-component';

const AsyncNetworkMetricsChart = createAsyncComponent(() =>
  import('./network-metrics-chart'),
);

export default AsyncNetworkMetricsChart;
