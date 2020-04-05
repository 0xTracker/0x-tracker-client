import _ from 'lodash';
import { setOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { createGlobalStyle } from 'styled-components';
import { configureViewport } from '@storybook/addon-viewport';
import React from 'react';
import StoryRouter from 'storybook-react-router';

// This must come before GlobalStyles due to import precedence
import 'bootstrap/dist/css/bootstrap.css';

import { colors } from '../src/styles/constants';
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

addDecorator(
  withBackgrounds([
    { name: 'athens gray', value: colors.athensGray },
    { name: 'violet', value: colors.violet },
    { default: true, name: 'white', value: colors.white },
  ]),
);

configureViewport();

setOptions({
  addonPanelInRight: false,
  hierarchyRootSeparator: /\|/,
  name: '0x Tracker',
  sortStoriesByKind: true,
});

const req = require.context('../src', true, /\.stories.js$/);

function loadStories() {
  _.forEach(req.keys(), (filename) => req(filename));
}

configure(loadStories, module);
