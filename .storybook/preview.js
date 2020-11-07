import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addParameters, addDecorator } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';
import React from 'react';
import StoryRouter from 'storybook-react-router';

// This must come before GlobalStyles due to import precedence
import 'bootstrap/dist/css/bootstrap.css';

import { COLORS } from '../src/styles/constants';
import { BREAKPOINTS } from '../src/constants';
import { BreakpointProvider } from '../src/responsive-utils';
import GlobalStyles from '../src/components/global-styles';

const StorybookStyles = createGlobalStyle`
  body {
    background-color: initial;
  }
`;

const withGlobalStyles = (storyFn) => (
  <>
    <GlobalStyles />
    <StorybookStyles />
    {storyFn()}
  </>
);

const withBreakpointProvider = (storyFn) => (
  <BreakpointProvider breakpoints={BREAKPOINTS}>{storyFn()}</BreakpointProvider>
);

addDecorator(withBreakpointProvider);
addDecorator(withGlobalStyles);
addDecorator(new StoryRouter());

addParameters({
  backgrounds: [
    { default: true, name: 'None', value: 'white' },
    { name: 'Body', value: COLORS.NEUTRAL.MYSTIC_200 },
  ],
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
