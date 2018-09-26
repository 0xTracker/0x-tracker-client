import { storiesOf } from '@storybook/react';
import React from 'react';

import LoadingIndicator from '../src/components/loading-indicator';

storiesOf('Common|LoadingIndicator', module)
  .addWithJSX('large spinner', () => <LoadingIndicator />)
  .addWithJSX('large cylon', () => <LoadingIndicator type="cylon" />)
  .addWithJSX('small spinner', () => <LoadingIndicator size="small" />)
  .addWithJSX('small cylon', () => (
    <LoadingIndicator size="small" type="cylon" />
  ))
  .addWithJSX('centered spinner', () => <LoadingIndicator isCentered />)
  .addWithJSX('centered cylon', () => (
    <LoadingIndicator isCentered type="cylon" />
  ));
