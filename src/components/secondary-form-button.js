import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const SecondaryFormButton = styled.button`
  background-color: ${COLORS.NEUTRAL.MYSTIC_300};
  border: none;
  border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_500};
  border-radius: 0.25rem;
  color: ${COLORS.NEUTRAL.MYSTIC_900};
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin: 0 0 0 0.5rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;

  &:hover,
  &:active {
    background-color: ${COLORS.NEUTRAL.MYSTIC_400};
  }

  &:active {
    border-bottom-color: ${COLORS.NEUTRAL.MYSTIC_400};
  }
`;

export default SecondaryFormButton;
