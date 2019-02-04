import { render } from 'react-testing-library';
import React from 'react';

import CloseIcon from './close-icon';

describe('close icon component', () => {
  it('should render without props', () => {
    const { container } = render(<CloseIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
