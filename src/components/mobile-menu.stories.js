import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import React from 'react';

import MobileMenu from './mobile-menu';

const simpleProps = {
  onClose: _.noop,
  onNavigate: _.noop,
  onSearch: _.noop,
};

storiesOf('Layout|MobileMenu', module)
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add('default', () => <MobileMenu {...simpleProps} />);
