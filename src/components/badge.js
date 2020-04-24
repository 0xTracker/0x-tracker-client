import _ from 'lodash';
import styled from 'styled-components';

const Badge = styled.span.attrs((props) => ({
  children: _.isString(props.children)
    ? props.children.toUpperCase()
    : props.children,
  className: 'badge',
}))`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  padding: 0.25rem 0.5rem;
`;

export default Badge;
