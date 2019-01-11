import _ from 'lodash';
import { setOptions } from '@storybook/addon-options';
import { addDecorator, configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import React from 'react';
import StoryRouter from 'storybook-router';

import 'bootstrap/dist/css/bootstrap.css'; // This must come before GlobalStyles due to import precedence

import GlobalStyles from '../src/components/global-styles';

function withGlobalStyles(storyFn) {
  return (
    <>
      <GlobalStyles />
      {storyFn()}
    </>
  );
}

addDecorator(withGlobalStyles);
addDecorator(new StoryRouter());

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
