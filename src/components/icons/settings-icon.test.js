import { render } from 'react-testing-library';
import React from 'react';

import SettingsIcon from './settings-icon';

describe('settings icon component', () => {
  it('should render without props', () => {
    const { container } = render(<SettingsIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
