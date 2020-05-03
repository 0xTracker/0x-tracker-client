import _ from 'lodash';
import styled from 'styled-components';

const Badge = styled.span.attrs((props) => ({
  children: _.isString(props.children)
    ? props.children.toUpperCase()
    : props.children,
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

export default Badge;
