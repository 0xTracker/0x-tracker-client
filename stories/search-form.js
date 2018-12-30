import { storiesOf } from '@storybook/react';
import React from 'react';

import SearchForm from '../src/features/search/components/search-form';

storiesOf('Search|SearchForm', module).addWithJSX('default', () => (
  <SearchForm />
));
