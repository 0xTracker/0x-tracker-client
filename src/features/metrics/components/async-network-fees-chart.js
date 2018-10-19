import createAsyncComponent from '../../../util/create-async-component';

const AsyncNetworkFeesChart = createAsyncComponent(() =>
  import('./network-fees-chart'),
);

export default AsyncNetworkFeesChart;
