import { storiesOf } from '@storybook/react';
import React from 'react';

import Paginator from '../src/components/paginator';
import ReduxContext from '../src/components/redux-context';

const simpleProps = {
  onPageChange: page => console.log(`page changed to ${page}`),
  pageCount: 19,
  pageSize: 15,
  recordCount: 276,
};

storiesOf('Common|Paginator', module)
  .addDecorator(getStory => <ReduxContext>{getStory()}</ReduxContext>)
  .addWithJSX('default', () => <Paginator {...simpleProps} />)
  .addWithJSX('with page changing', () => (
    <Paginator {...simpleProps} changingPage />
  ))
  .addWithJSX('with 3 pages', () => (
    <Paginator {...simpleProps} pageCount={3} />
  ));
