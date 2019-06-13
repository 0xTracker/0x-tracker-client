import { render } from '@testing-library/react';
import React from 'react';

import CardHeading from './card-heading';

describe('card heading component', () => {
  it('should render with children', () => {
    const { container } = render(<CardHeading>Hello World</CardHeading>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
