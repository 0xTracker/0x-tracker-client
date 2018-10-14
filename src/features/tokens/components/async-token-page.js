import createAsyncComponent from '../../../util/create-async-component';

const AsyncTokenPage = createAsyncComponent(() => import('./token-page'));

export default AsyncTokenPage;
