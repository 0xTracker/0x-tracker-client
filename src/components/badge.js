import styled from 'styled-components';

const Badge = styled.span.attrs((props) => ({
  children: props.children.toUpperCase(),
  className: 'badge',
}))`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
`;

export default Badge;
