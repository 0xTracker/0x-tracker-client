import { render } from 'react-testing-library';
import React from 'react';

import GitHubIcon from './git-hub-icon';

describe('github icon component', () => {
  it('should render without props', () => {
    const { container } = render(<GitHubIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
