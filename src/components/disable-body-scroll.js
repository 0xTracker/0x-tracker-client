import { createGlobalStyle } from 'styled-components';

const DisableBodyScroll = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export default DisableBodyScroll;
