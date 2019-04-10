import { URL } from '../../../constants';

const buildTokenUrl = tokenAddress => {
  return URL.TOKEN.replace(':address', tokenAddress);
};

export default buildTokenUrl;
