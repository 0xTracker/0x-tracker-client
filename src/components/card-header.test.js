import { render } from '@testing-library/react';
import React from 'react';

import CardHeader from './card-header';

describe('card header component', () => {
  it('should render with children', () => {
    const { container } = render(<CardHeader>Hello World</CardHeader>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
