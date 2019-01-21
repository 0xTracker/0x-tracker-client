import { storiesOf } from '@storybook/react';
import React from 'react';

import LoadingIndicator from './loading-indicator';

storiesOf('Common|LoadingIndicator', module)
  .add('large spinner', () => <LoadingIndicator />)
  .add('large cylon', () => <LoadingIndicator type="cylon" />)
  .add('small spinner', () => <LoadingIndicator size="small" />)
  .add('small cylon', () => <LoadingIndicator size="small" type="cylon" />)
  .add('centered spinner', () => <LoadingIndicator centered />)
  .add('centered cylon', () => <LoadingIndicator centered type="cylon" />);
