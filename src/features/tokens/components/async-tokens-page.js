import createAsyncComponent from '../../../util/create-async-component';

const AsyncTokensPage = createAsyncComponent(() => import('./tokens-page'));

export default AsyncTokensPage;
