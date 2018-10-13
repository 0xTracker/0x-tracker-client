import _ from 'lodash';
import { setOptions } from '@storybook/addon-options';
import { addDecorator, configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import StoryRouter from 'storybook-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'babel-polyfill';

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
