import createAsyncComponent from '../../../util/create-async-component';

const AsyncTopTokensChart = createAsyncComponent(() =>
  import('./top-tokens-chart'),
);

export default AsyncTopTokensChart;
