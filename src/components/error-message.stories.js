import { storiesOf } from '@storybook/react';
import React from 'react';

import ErrorMessage from './error-message';
import ReduxContext from './redux-context';
import H1 from './h1';
import Lead from './lead';
import Link from './link';

storiesOf('Layout|ErrorMessage', module)
  .addDecorator(getStory => <ReduxContext>{getStory()}</ReduxContext>)
  .add('default', () => (
    <ErrorMessage>
      <H1>Page Not Found</H1>
      <Lead>
        Oops, you&lsquo;ve tried to load a page that doesn&lsquo;t exist.
      </Lead>
      <Link href="/">Back to Dashboard</Link>
    </ErrorMessage>
  ));
