import createAsyncComponent from '../../../util/create-async-component';

const AsyncRelayerPage = createAsyncComponent(() => import('./relayer-page'));

export default AsyncRelayerPage;
