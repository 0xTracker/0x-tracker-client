import { render } from '@testing-library/react';
import React from 'react';

import MenuIcon from './menu-icon';

describe('menu icon component', () => {
  it('should render without props', () => {
    const { container } = render(<MenuIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
