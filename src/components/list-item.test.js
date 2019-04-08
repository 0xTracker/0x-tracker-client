import { render } from 'react-testing-library';
import React from 'react';

import ListItem from './list-item';

describe('list item component', () => {
  it('should render with children', () => {
    const { container } = render(<ListItem>hello world</ListItem>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
