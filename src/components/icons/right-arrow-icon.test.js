import { render } from 'react-testing-library';
import React from 'react';

import RightArrowIcon from './right-arrow-icon';

describe('right arrow icon component', () => {
  it('should render without props', () => {
    const { container } = render(<RightArrowIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
