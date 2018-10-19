import createAsyncComponent from '../../../util/create-async-component';

const AsyncRelayersPage = createAsyncComponent(() => import('./relayers-page'));

export default AsyncRelayersPage;
