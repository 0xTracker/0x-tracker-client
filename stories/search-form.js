import { storiesOf } from '@storybook/react';
import backgrounds from '@storybook/addon-backgrounds';
import React from 'react';

import { colors } from '../src/styles/constants';
import SearchForm from '../src/features/search/components/search-form';

storiesOf('Search|SearchForm', module)
  .addDecorator(
    backgrounds([{ name: 'navigation', value: colors.tuna, default: true }]),
  )
  .addWithJSX('default', () => <SearchForm />);
