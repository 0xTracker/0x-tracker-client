import { addDecorator, addParameters } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';
import StoryRouter from 'storybook-react-router';

import 'bootstrap/dist/css/bootstrap.css'; // Must come before GlobalStyles due to import precedence

import { BREAKPOINTS } from '../src/constants';
import { BreakpointProvider } from '../src/responsive-utils';
import { colors } from '../src/styles/constants';
import GlobalStyles from '../src/components/global-styles';

const StorybookStyles = createGlobalStyle`
  body {
    background-color: initial;
  }
`;

addDecorator(storyFn => (
  <>
    <GlobalStyles />
    <StorybookStyles />
    {storyFn()}
  </>
));

addDecorator(new StoryRouter());

addDecorator(storyFn => (
  <BreakpointProvider breakpoints={BREAKPOINTS}>{storyFn()}</BreakpointProvider>
));

addParameters({
  backgrounds: [
    { name: 'athens gray', value: colors.athensGray },
    { name: 'violet', value: colors.violet },
    { default: true, name: 'white', value: colors.white },
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
