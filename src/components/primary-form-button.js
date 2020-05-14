import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const PrimaryFormButton = styled.button`
  align-items: center;
  background-color: ${COLORS.ACCENT.ANZAC_300};
  border: none;
  border-bottom: 2px solid ${COLORS.ACCENT.ANZAC_600};
  border-radius: 0.25rem;
  color: ${COLORS.ACCENT.ANZAC_1000};
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  font-weight: 500;
  justify-content: center;
  letter-spacing: 0.05em;
  min-height: 42px;
  min-width: 120px;
  padding: 0rem 1rem;
  text-transform: uppercase;

  &:hover,
  &:active {
    background-color: ${COLORS.ACCENT.ANZAC_400};
  }

  &:active {
    border-bottom-color: ${COLORS.ACCENT.ANZAC_400};
  }

  &:disabled {
    color: ${COLORS.ACCENT.ANZAC_700};
  }
`;

export default PrimaryFormButton;
