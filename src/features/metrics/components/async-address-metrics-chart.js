import createAsyncComponent from '../../../util/create-async-component';

const AsyncAddressMetricsChart = createAsyncComponent(() =>
  import('./address-metrics-chart'),
);

export default AsyncAddressMetricsChart;
