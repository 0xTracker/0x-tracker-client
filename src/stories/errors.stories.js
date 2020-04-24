import { storiesOf } from '@storybook/react';
import React from 'react';

import InvalidParametersError from '../components/invalid-parameters-error';
import UnexpectedError from '../components/unexpected-error';

storiesOf('Layout|Error Messages', module)
  .add('Invalid Parameters', () => <InvalidParametersError />)
  .add('Unexpected Error', () => <UnexpectedError />);
