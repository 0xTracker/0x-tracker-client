import { createGlobalStyle } from 'styled-components';

const DisableBodyScroll = createGlobalStyle`
  html,
  body {
    overflow: hidden;
  }
`;

export default DisableBodyScroll;
