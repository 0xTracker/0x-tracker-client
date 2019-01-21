import { render } from 'react-testing-library';
import React from 'react';

import Card from './card';
import CardHeading from './card-heading';

describe('card component', () => {
  it('should render with children', () => {
    const { container } = render(<Card>Hello World</Card>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with header', () => {
    const { container } = render(
      <Card header={<CardHeading>Welcome Message</CardHeading>}>
        Hello World
      </Card>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
