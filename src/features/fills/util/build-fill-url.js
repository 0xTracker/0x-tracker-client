import { URL } from '../../../constants';

const buildFillUrl = fillId => URL.FILL.replace(':id', fillId);

export default buildFillUrl;
