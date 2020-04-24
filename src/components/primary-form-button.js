import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const PrimaryFormButton = styled.button`
  background-color: ${COLORS.ACCENT.ANZAC_300};
  border: none;
  border-bottom: 2px solid ${COLORS.ACCENT.ANZAC_600};
  border-radius: 0.25rem;
  color: ${COLORS.ACCENT.ANZAC_1000};
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 0.5rem 1rem;
  text-transform: uppercase;

  &:hover,
  &:active {
    background-color: ${COLORS.ACCENT.ANZAC_400};
  }

  &:active {
    border-bottom-color: ${COLORS.ACCENT.ANZAC_400};
  }
`;

export default PrimaryFormButton;
