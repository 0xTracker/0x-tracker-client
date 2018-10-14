import createAsyncComponent from '../../../util/create-async-component';

const AsyncSearchPage = createAsyncComponent(() => import('./search-page'));

export default AsyncSearchPage;
