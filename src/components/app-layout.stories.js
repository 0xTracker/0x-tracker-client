import { storiesOf } from '@storybook/react';
import React from 'react';

import AppLayout from './app-layout';
import ReduxContext from './redux-context';

storiesOf('Layout|AppLayout', module)
  .addDecorator(getStory => <ReduxContext>{getStory()}</ReduxContext>)
  .add('default', () => (
    <AppLayout>
      <p>Hello World</p>
    </AppLayout>
  ));
