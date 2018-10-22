import { storiesOf } from '@storybook/react';
import React from 'react';

import AppLayout from '../src/components/app-layout';
import ReduxContext from '../src/components/redux-context';

storiesOf('Layout|AppLayout', module)
  .addDecorator(getStory => <ReduxContext>{getStory()}</ReduxContext>)
  .addWithJSX('default', () => (
    <AppLayout>
      <p>Hello World</p>
    </AppLayout>
  ));
