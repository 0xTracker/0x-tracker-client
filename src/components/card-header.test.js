import { render } from 'react-testing-library';
import React from 'react';

import CardHeader from './card-header';

describe('card header component', () => {
  it('should render with children', () => {
    const { container } = render(<CardHeader>Hello World</CardHeader>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
