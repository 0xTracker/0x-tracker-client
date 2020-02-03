import createAsyncComponent from '../../../util/create-async-component';

const AsyncProtocolMetricsChart = createAsyncComponent(() =>
  import('./protocol-metrics-chart'),
);

export default AsyncProtocolMetricsChart;
