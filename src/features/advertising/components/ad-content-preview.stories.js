import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';

import AdContentPreview from './ad-content-preview';

storiesOf('Advertising|AdContentPreview', module).add('Basic', () => (
  <AdContentPreview
    content={{
      description:
        'Privacy focused alternative to Google Analytics. Free for 7 days, then $10 off your first bill',
      imageUrl: 'https://resources.0xtracker.com/logos/fathom.png',
      title: 'Fathom Analytics',
      url: 'https://usefathom.com',
    }}
    onClose={_.noop}
  />
));
