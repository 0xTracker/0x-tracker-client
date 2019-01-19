import _ from 'lodash';
import { setOptions } from '@storybook/addon-options';
import { addDecorator, configure, setAddon } from '@storybook/react';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { createGlobalStyle } from 'styled-components';
import { configureViewport } from '@storybook/addon-viewport';
import JSXAddon from 'storybook-addon-jsx';
import React from 'react';
import StoryRouter from 'storybook-router';

import 'bootstrap/dist/css/bootstrap.css'; // This must come before GlobalStyles due to import precedence

import GlobalStyles from '../src/components/global-styles';
import { colors } from '../src/styles/constants';

const StorybookStyles = createGlobalStyle`
  body {
    background-color: initial;
  }
`;

function withGlobalStyles(storyFn) {
  return (
    <>
      <GlobalStyles />
      <StorybookStyles />
      {storyFn()}
    </>
  );
}

addDecorator(withGlobalStyles);
addDecorator(new StoryRouter());

addDecorator(
  withBackgrounds([
    { default: true, name: 'card', value: colors.white },
    { name: 'body', value: colors.athensGray },
  ]),
);

configureViewport();

setOptions({
  addonPanelInRight: false,
  hierarchyRootSeparator: /\|/,
  name: '0x Tracker',
});

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  _.forEach(req.keys(), filename => req(filename));
}

setAddon(JSXAddon);
configure(loadStories, module);
