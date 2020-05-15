import _ from 'lodash';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const Badge = styled.span.attrs((props) => ({
  bgColor: props.bgColor ? props.bgColor : COLORS.NEUTRAL.MYSTIC_300,
  children:
    _.isString(props.children) && props.upperCase
      ? props.children.toUpperCase()
      : props.children,
  textColor: props.textColor ? props.textColor : COLORS.PRIMARY.SCAMPI_1000,
}))`
  background-color: ${(props) => props.bgColor};
  border-radius: 4px;
  color: ${(props) => props.textColor};
  display: inline-block;
  font-weight: 500;
  font-size: 11px;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  text-align: center;
  white-space: nowrap;
`;

Badge.defaultProps = {
  upperCase: true,
};

export default Badge;
