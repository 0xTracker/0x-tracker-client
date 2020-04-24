import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const Pill = styled.span`
  align-items: center;
  background-color: ${COLORS.NEUTRAL.MYSTIC_300};
  border-radius: 0.25rem;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  font-size: 11px;
  font-weight: 600;
  height: 1.6rem;
  letter-spacing: 0.05em;
  line-height: 1;
  padding: 0.2rem 0.7rem;
  text-transform: uppercase;

  &:hover {
    background-color: ${COLORS.NEUTRAL.MYSTIC_400};
    color: currentColor;
    text-decoration: none;
  }
`;

export default Pill;
