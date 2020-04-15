import styled from 'styled-components';

import { colors } from '../styles/constants';

const Card = styled.div`
  background-color: ${colors.white};
  border: none;
  box-shadow: 0px 1px 2px rgba(126, 142, 177, 0.12);
  display: flex;
  flex-direction: column;
  flex-grow: ${(props) => (props.fullHeight ? '1' : '0')};
  overflow: hidden;
`;

export default Card;
