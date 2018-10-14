import createAsyncComponent from '../../../util/create-async-component';

const AsyncTopRelayersChart = createAsyncComponent(() =>
  import('./top-relayers-chart'),
);

export default AsyncTopRelayersChart;
