import styled from 'styled-components';

const IconBase = styled.svg
  .withConfig({ shouldForwardProp: (prop) => prop !== 'size' })
  .attrs((props) => ({
    'aria-hidden': true,
    fill: props.fill ? props.fill : 'currentColor',
    focusable: false,
    height: props.height ? props.height : props.size,
    width: props.width ? props.width : props.size,
    xmlns: 'http://www.w3.org/2000/svg',
  }))`
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
`;

IconBase.defaultProps = {
  size: 24,
};

export default IconBase;
