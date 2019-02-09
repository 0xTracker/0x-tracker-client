import { storiesOf } from '@storybook/react';
import React from 'react';

import Paginator from './paginator';
import ReduxContext from './redux-context';

const simpleProps = {
  // eslint-disable-next-line no-console
  onPageChange: page => console.log(`page changed to ${page}`),
  pageCount: 19,
  pageSize: 15,
  recordCount: 276,
};

storiesOf('Common|Paginator', module)
  .addDecorator(getStory => <ReduxContext>{getStory()}</ReduxContext>)
  .add('default', () => <Paginator {...simpleProps} />)
  .add('with page changing', () => <Paginator {...simpleProps} changingPage />)
  .add('with 3 pages', () => <Paginator {...simpleProps} pageCount={3} />);
