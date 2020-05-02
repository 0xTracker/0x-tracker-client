import styled from 'styled-components';

import { media } from '../styles/util';

const CardGrid = styled.div`
  margin-bottom: -1.25rem;

  ${media.greaterThan('lg')`
    margin-bottom: -2rem;
  `}
`;

export default CardGrid;
