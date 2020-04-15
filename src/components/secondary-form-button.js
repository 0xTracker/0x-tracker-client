import styled from 'styled-components';

import { colors } from '../styles/constants';
import PrimaryFormButton from './primary-form-button';

const SecondaryFormButton = styled(PrimaryFormButton)`
  background-color: ${colors.athensGray};
  color: ${colors.violet};
  margin: 0 0 0 0.5rem;

  &:hover,
  &:active {
    background-color: ${colors.mischka};
  }
`;

export default SecondaryFormButton;
