import { render } from '@testing-library/react';
import React from 'react';

import MoreIcon from './more-icon';

describe('more icon component', () => {
  it('should render without props', () => {
    const { container } = render(<MoreIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
