import { render } from 'react-testing-library';
import React from 'react';

import MenuIcon from './menu-icon';

describe('menu icon component', () => {
  it('should render without props', () => {
    const { container } = render(<MenuIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
