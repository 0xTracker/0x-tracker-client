import createAsyncComponent from '../../../util/create-async-component';

const AsyncFillPage = createAsyncComponent(() => import('./fill-page'));

export default AsyncFillPage;
