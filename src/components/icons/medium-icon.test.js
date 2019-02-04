import { render } from 'react-testing-library';
import React from 'react';

import MediumIcon from './medium-icon';

describe('medium icon component', () => {
  it('should render without props', () => {
    const { container } = render(<MediumIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
