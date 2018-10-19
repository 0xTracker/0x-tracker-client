import createAsyncComponent from '../../../util/create-async-component';

const AsyncTokenVolumeChart = createAsyncComponent(() =>
  import('./token-volume-chart'),
);

export default AsyncTokenVolumeChart;
