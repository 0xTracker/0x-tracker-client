import createAsyncComponent from '../../../util/create-async-component';

const AsyncMiniRelayerMetricsChart = createAsyncComponent(() =>
  import('./mini-relayer-metrics-chart'),
);

export default AsyncMiniRelayerMetricsChart;
