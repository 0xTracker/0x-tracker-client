import { render } from '@testing-library/react';
import React from 'react';

import LeftArrowIcon from './left-arrow-icon';

describe('left arrow icon component', () => {
  it('should render without props', () => {
    const { container } = render(<LeftArrowIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
