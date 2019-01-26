import styled from 'styled-components';

import { media } from '../styles/util';

const Lead = styled.p`
  font-size: 1.1rem;
  margin: 0 0 2rem 0;

  ${media.greaterThan('md')`
    font-size: 1.3rem;
  `}
`;

export default Lead;
