import { render } from 'react-testing-library';
import React from 'react';

import TwitterIcon from './twitter-icon';

describe('twitter icon component', () => {
  it('should render without props', () => {
    const { container } = render(<TwitterIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
