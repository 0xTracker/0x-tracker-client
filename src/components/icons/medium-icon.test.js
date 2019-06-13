import { render } from '@testing-library/react';
import React from 'react';

import MediumIcon from './medium-icon';

describe('medium icon component', () => {
  it('should render without props', () => {
    const { container } = render(<MediumIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
