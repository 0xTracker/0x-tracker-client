// eslint-disable-next-line filenames/match-exported
import styled from 'styled-components';

import { media } from '../styles/util';

const H1 = styled.h1`
  font-size: 1.6rem;

  ${media.greaterThan('md')`
    font-size: 2rem;
  `}
`;

export default H1;
