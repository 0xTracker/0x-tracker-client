import { render } from '@testing-library/react';
import React from 'react';

import Pill from './pill';

describe('pill component', () => {
  it('should render with children', () => {
    const { container } = render(<Pill>Hello World</Pill>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
