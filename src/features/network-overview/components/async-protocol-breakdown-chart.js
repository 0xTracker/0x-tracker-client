import createAsyncComponent from '../../../util/create-async-component';

const AsyncProtocolBreakdownChart = createAsyncComponent(() =>
  import('./protocol-breakdown-chart'),
);

export default AsyncProtocolBreakdownChart;
