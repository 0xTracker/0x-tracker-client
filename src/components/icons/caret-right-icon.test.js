import { render } from '@testing-library/react';
import React from 'react';

import CaretRightIcon from './caret-right-icon';

describe('caret right icon component', () => {
  it('should render without props', () => {
    const { container } = render(<CaretRightIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
