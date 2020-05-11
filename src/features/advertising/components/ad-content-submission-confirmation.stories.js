import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';

import AdContentSubmissionConfirmation from './ad-content-submission-confirmation';

storiesOf('Advertising|AdContentSubmissionConfirmation', module).add(
  'Basic',
  () => <AdContentSubmissionConfirmation onClose={_.noop} />,
);
