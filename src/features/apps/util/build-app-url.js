import { URL } from '../../../constants';

const buildAppUrl = (urlSlug) => URL.APP.replace(':slug', urlSlug);

export default buildAppUrl;
