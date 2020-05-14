import { storiesOf } from '@storybook/react';
import React from 'react';

import LoadingIndicator from './loading-indicator';

storiesOf('Common|LoadingIndicator', module)
  .add('large spinner', () => <LoadingIndicator />)
  .add('large cylon', () => <LoadingIndicator type="cylon" />)
  .add('medium spinner', () => <LoadingIndicator size="medium" />)
  .add('medium cylon', () => <LoadingIndicator size="medium" type="cylon" />)
  .add('small spinner', () => <LoadingIndicator size="small" />)
  .add('small cylon', () => <LoadingIndicator size="small" type="cylon" />)
  .add('200px spinner', () => <LoadingIndicator size={200} />)
  .add('200px cylon', () => <LoadingIndicator size={200} type="cylon" />)
  .add('centered spinner', () => <LoadingIndicator centered />)
  .add('centered cylon', () => <LoadingIndicator centered type="cylon" />)
  .add('red spinner', () => <LoadingIndicator color="red" />)
  .add('red cylon', () => <LoadingIndicator color="red" type="cylon" />);
