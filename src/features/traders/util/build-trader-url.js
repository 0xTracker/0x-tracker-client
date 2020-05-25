import { URL } from '../../../constants';
import buildUrl from '../../../util/build-url';

const buildTraderUrl = (address, params) =>
  buildUrl(URL.TRADER.replace(':address', address), params);

export default buildTraderUrl;
