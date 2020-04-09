import createAsyncComponent from '../../../util/create-async-component';

const AsyncTokenPricesChart = createAsyncComponent(() =>
  import('./token-prices-chart'),
);

export default AsyncTokenPricesChart;
