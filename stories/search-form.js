import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import React from 'react';

import SearchForm from '../src/features/search/components/search-form';

storiesOf('Search|SearchForm', module)
  .addDecorator(
    backgrounds([{ name: 'navigation', value: '#343a40', default: true }]),
  )
  .addWithJSX('default', () => <SearchForm />);
