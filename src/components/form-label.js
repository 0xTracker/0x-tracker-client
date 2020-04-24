import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const FormLabel = styled.label`
  color: ${COLORS.NEUTRAL.MYSTIC_600};
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin: ${(props) => (props.first ? 0 : '1.5rem')} 0 0.25rem 0;
  text-transform: uppercase;
`;

export default FormLabel;
