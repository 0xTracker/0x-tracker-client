import { setOptions } from '@storybook/addon-options';
import { addParameters, addDecorator } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';
import { configureViewport } from '@storybook/addon-viewport';
import React from 'react';
import StoryRouter from 'storybook-react-router';

// This must come before GlobalStyles due to import precedence
import 'bootstrap/dist/css/bootstrap.css';

import { colors, COLORS } from '../src/styles/constants';
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

addDecorator(withGlobalStyles);
addDecorator(new StoryRouter());

configureViewport();

setOptions({
  addonPanelInRight: false,
  hierarchyRootSeparator: /\|/,
  name: '0x Tracker',
  sortStoriesByKind: true,
});

addParameters({
  backgrounds: [
    { default: true, name: 'None', value: 'white' },
    { name: 'Body', value: COLORS.NEUTRAL.MYSTIC_100 },
    { name: 'violet', value: colors.violet },
  ],
});
