import { storiesOf } from '@storybook/react';
import React from 'react';

import SpectrumIcon from './spectrum-icon';

storiesOf('Icons|SpectrumIcon', module)
  .add('default', () => <SpectrumIcon height={50} width={50} />)
  .add('red', () => <SpectrumIcon css="color: red;" height={50} width={50} />);
