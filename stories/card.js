import { storiesOf } from '@storybook/react';
import React from 'react';

import Card from '../src/components/card';
import CardHeading from '../src/components/card-heading';

storiesOf('Layout|Card', module)
  .addDecorator(getStory => (
    <div css="display: flex; flex-direction: column; height: 100%; padding: 1rem;">
      {getStory()}
    </div>
  ))
  .addWithJSX('default', () => <Card>Hello World</Card>)
  .addWithJSX('padded', () => <Card padded>Hello World</Card>)
  .addWithJSX('full height', () => <Card fullHeight>Hello World</Card>)
  .addWithJSX('with header', () => (
    <Card header={<CardHeading>Hello World</CardHeading>} padded>
      Welcome to storybook
    </Card>
  ))
  .addWithJSX('with custom styles', () => (
    <Card css="background-color: chocolate; color: white; padding: 2rem;">
      Hello World
    </Card>
  ));
