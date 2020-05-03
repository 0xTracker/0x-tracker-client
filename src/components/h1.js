// eslint-disable-next-line filenames/match-exported
import styled from 'styled-components';

import { media } from '../styles/util';

const H1 = styled.h1`
  font-size: 24px;

  ${media.greaterThan('md')`
    font-size: 30px;
  `}
`;

export default H1;
