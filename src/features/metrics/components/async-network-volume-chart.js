import createAsyncComponent from '../../../util/create-async-component';

const AsyncNetworkVolumeChart = createAsyncComponent(() =>
  import('./network-volume-chart'),
);

export default AsyncNetworkVolumeChart;
