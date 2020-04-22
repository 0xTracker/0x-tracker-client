import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const PrimaryFormButton = styled.button`
  background-color: ${COLORS.PRIMARY.SCAMPI_600};
  border: none;
  border-radius: 0.25rem;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover,
  &:active {
    background-color: ${COLORS.PRIMARY.SCAMPI_700};
  }
`;

export default PrimaryFormButton;
