import { storiesOf } from '@storybook/react';
import React from 'react';

import FillStatusBadge from './fill-status-badge';

storiesOf('Fills|FillStatusBadge', module)
  .add('Pending', () => <FillStatusBadge>pending</FillStatusBadge>)
  .add('Failed', () => <FillStatusBadge>failed</FillStatusBadge>)
  .add('Successful', () => <FillStatusBadge>successful</FillStatusBadge>);
