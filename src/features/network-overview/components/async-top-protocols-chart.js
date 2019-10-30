import createAsyncComponent from '../../../util/create-async-component';

const AsyncTopProtocolsChart = createAsyncComponent(() =>
  import('./top-protocols-chart'),
);

export default AsyncTopProtocolsChart;
