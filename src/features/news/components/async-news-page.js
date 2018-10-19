import createAsyncComponent from '../../../util/create-async-component';

const AsyncNewsPage = createAsyncComponent(() => import('./news-page'));

export default AsyncNewsPage;
