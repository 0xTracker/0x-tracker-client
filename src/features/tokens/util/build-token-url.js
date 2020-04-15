import { URL } from '../../../constants';
import buildUrl from '../../../util/build-url';

const buildTokenUrl = (tokenAddress, params) =>
  buildUrl(URL.TOKEN.replace(':address', tokenAddress), params);

export default buildTokenUrl;
