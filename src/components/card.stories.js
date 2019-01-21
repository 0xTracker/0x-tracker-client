import { storiesOf } from '@storybook/react';
import React from 'react';

import Card from './card';
import CardHeading from './card-heading';

storiesOf('Layout|Card', module)
  .addDecorator(getStory => (
    <div css="display: flex; flex-direction: column; height: 100%; padding: 1rem;">
      {getStory()}
    </div>
  ))
  .add('default', () => <Card>Hello World</Card>)
  .add('padded', () => <Card padded>Hello World</Card>)
  .add('full height', () => <Card fullHeight>Hello World</Card>)
  .add('with header', () => (
    <Card header={<CardHeading>Hello World</CardHeading>} padded>
      Welcome to storybook
    </Card>
  ))
  .add('with custom styles', () => (
    <Card css="background-color: chocolate; color: white; padding: 2rem;">
      Hello World
    </Card>
  ));
