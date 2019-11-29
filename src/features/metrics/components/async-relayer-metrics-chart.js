import createAsyncComponent from '../../../util/create-async-component';

const AsyncRelayerMetricsChart = createAsyncComponent(() =>
  import('./relayer-metrics-chart'),
);

export default AsyncRelayerMetricsChart;
