import { Col } from 'reactstrap';
import styled from 'styled-components';

import { media } from '../styles/util';

const CardGridCol = styled(Col).withConfig({
  shouldForwardProp: (prop) => prop !== 'minHeight',
})`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
  min-height: ${(props) =>
    props.minHeight !== undefined ? props.minHeight : 'initial'};

  ${media.greaterThan('lg')`
    margin-bottom: 2rem;
  `}
`;

export default CardGridCol;
