import createAsyncComponent from '../../../util/create-async-component';

const AsyncMiniTokenMetricsChart = createAsyncComponent(() =>
  import('./mini-token-metrics-chart'),
);

export default AsyncMiniTokenMetricsChart;
