import { css } from 'styled-components';

import { breakpoints } from './constants';

const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}px) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export { media };
