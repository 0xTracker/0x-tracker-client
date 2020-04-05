import { URL } from '../../../constants';

const buildTokenUrl = (tokenAddress) =>
  URL.TOKEN.replace(':address', tokenAddress);

export default buildTokenUrl;
