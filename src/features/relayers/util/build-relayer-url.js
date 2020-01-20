import { URL } from '../../../constants';

const buildRelayerUrl = relayer => URL.RELAYER.replace(':slug', relayer);

export default buildRelayerUrl;
