import styled from 'styled-components';

import { colors } from '../styles/constants';

const Pill = styled.span`
  background-color: ${props =>
    props.highlighted ? colors.athensGray : 'transparent'};
  border-radius: 0.25rem;
  color: inherit;
  cursor: pointer;
  font-size: 0.8em;
  padding: 0.2rem 0.7rem;
  text-transform: uppercase;

  &:hover {
    background-color: ${colors.mischka};
    color: currentColor;
    text-decoration: none;
  }
`;

export default Pill;
