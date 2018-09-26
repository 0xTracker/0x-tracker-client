import { storiesOf } from '@storybook/react';
import React from 'react';

import Paginator from '../src/components/paginator';

const simpleProps = {
  onPageChange: page => console.log(`page changed to ${page}`),
  pageCount: 20,
};

storiesOf('Common|Paginator', module)
  .addWithJSX('default', () => <Paginator {...simpleProps} />)
  .addWithJSX('with page changing', () => (
    <Paginator {...simpleProps} changingPage />
  ))
  .addWithJSX('with 3 pages', () => (
    <Paginator {...simpleProps} pageCount={3} />
  ));
