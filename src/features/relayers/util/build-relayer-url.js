import { URL } from '../../../constants';

const buildRelayerUrl = (slug) => URL.RELAYER.replace(':slug', slug);

export default buildRelayerUrl;
