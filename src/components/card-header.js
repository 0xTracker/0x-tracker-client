import { CardHeader as BoostrapCardHeader } from 'reactstrap';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const CardHeader = styled(BoostrapCardHeader)`
  align-items: center;
  background: none;
  border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_200};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

export default CardHeader;
