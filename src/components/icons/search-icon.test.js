import { render } from '@testing-library/react';
import React from 'react';

import SearchIcon from './search-icon';

describe('search icon component', () => {
  it('should render without props', () => {
    const { container } = render(<SearchIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
