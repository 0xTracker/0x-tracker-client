import { CardHeader as BoostrapCardHeader } from 'reactstrap';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const CardHeader = styled(BoostrapCardHeader)`
  background: none;
  border-bottom: 1px solid ${colors.athensGray};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

export default CardHeader;
