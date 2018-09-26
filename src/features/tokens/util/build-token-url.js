import { URL } from '../../../constants';

const buildTokenUrl = token => URL.TOKEN.replace(':address', token.address);

export default buildTokenUrl;
