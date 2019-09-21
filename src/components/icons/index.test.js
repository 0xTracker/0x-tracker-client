import { render } from '@testing-library/react';
import React from 'react';

import { FilterIcon } from '.';

it('should render filter icon', () => {
  const { container } = render(<FilterIcon />);

  expect(container.firstChild).toMatchSnapshot();
});
