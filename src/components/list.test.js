import { render } from '@testing-library/react';
import React from 'react';

import List from './list';

describe('list component', () => {
  it('should render without props', () => {
    const { container } = render(<List />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
