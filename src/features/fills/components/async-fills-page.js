import createAsyncComponent from '../../../util/create-async-component';

const AsyncFillsPage = createAsyncComponent(() => import('./fills-page'));

export default AsyncFillsPage;
