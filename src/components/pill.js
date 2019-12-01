import styled from 'styled-components';

import { colors } from '../styles/constants';

const Pill = styled.span`
  background-color: ${colors.athensGrayer};
  border-radius: 0.25rem;
  color: inherit;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.2rem 0.7rem;
  text-transform: uppercase;

  &:hover {
    background-color: ${colors.mystic};
    color: currentColor;
    text-decoration: none;
  }
`;

export default Pill;
