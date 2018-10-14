import createAsyncComponent from '../../../util/create-async-component';

const AsyncDashboardPage = createAsyncComponent(() =>
  import('./dashboard-page'),
);

export default AsyncDashboardPage;
