import { URL } from '../../../constants';

const buildRelayerUrl = relayer => URL.RELAYER.replace(':slug', relayer.slug);

export default buildRelayerUrl;
