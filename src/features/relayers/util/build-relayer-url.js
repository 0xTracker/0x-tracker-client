import { URL } from '../../../constants';

const buildRelayerUrl = (slug) => URL.APP.replace(':slug', slug);

export default buildRelayerUrl;
