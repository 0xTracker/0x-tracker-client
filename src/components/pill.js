import styled from 'styled-components';

import { colors } from '../styles/constants';

const Pill = styled.span`
  background-color: ${colors.athensGrayer};
  border-radius: 0.25rem;
  border: none;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  font-size: 0.8rem;
  height: 1.6rem;
  padding: 0.2rem 0.7rem;
  text-transform: uppercase;

  &:hover {
    background-color: ${colors.mystic};
    color: currentColor;
    text-decoration: none;
  }
`;

export default Pill;
