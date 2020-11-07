import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const SecondaryFormButton = styled.button`
  align-items: center;
  background-color: ${COLORS.NEUTRAL.MYSTIC_400};
  border: none;
  border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_500};
  border-radius: 0.25rem;
  color: ${COLORS.NEUTRAL.MYSTIC_900};
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.05em;
  margin: 0 0 0 0.5rem;
  min-height: 42px;
  min-width: 120px;
  padding: 0 1rem;
  text-transform: uppercase;

  &:hover,
  &:active {
    background-color: ${COLORS.NEUTRAL.MYSTIC_500};
    border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_600};
  }

  &:active {
    border-bottom-color: ${COLORS.NEUTRAL.MYSTIC_500};
    border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_600};
  }

  &:disabled {
    color: ${COLORS.NEUTRAL.MYSTIC_700};
  }
`;

export default SecondaryFormButton;
