import { render } from '@testing-library/react';
import React from 'react';

import DiscordIcon from './discord-icon';

describe('discord icon component', () => {
  it('should render without props', () => {
    const { container } = render(<DiscordIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
