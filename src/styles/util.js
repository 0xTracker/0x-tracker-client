import _ from 'lodash';
import { generateMedia } from 'styled-media-query';

import { breakpoints } from './constants';

const pixelBreakpoints = _.mapValues(breakpoints, (value) => `${value}px`);
const media = generateMedia(pixelBreakpoints);

// eslint-disable-next-line import/prefer-default-export
export { media };
