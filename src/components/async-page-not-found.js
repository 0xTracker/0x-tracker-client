import createAsyncComponent from '../util/create-async-component';

const AsyncPageNotFound = createAsyncComponent(() =>
  import('./page-not-found'),
);

export default AsyncPageNotFound;
