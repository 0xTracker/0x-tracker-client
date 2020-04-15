import styled from 'styled-components';

import { colors } from '../styles/constants';

const PrimaryFormButton = styled.button`
  background-color: ${colors.martinique};
  border: none;
  border-radius: 0.25rem;
  color: ${colors.white};
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover,
  &:active {
    background-color: ${colors.violet};
  }
`;

export default PrimaryFormButton;
