import { storiesOf } from '@storybook/react';
import React from 'react';

import SpectrumIcon from '../src/components/spectrum-icon';

storiesOf('Icons|SpectrumIcon', module)
  .addWithJSX('default', () => <SpectrumIcon height={50} width={50} />)
  .addWithJSX('red', () => (
    <SpectrumIcon css="color: red;" height={50} width={50} />
  ));
