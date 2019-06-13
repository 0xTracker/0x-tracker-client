import { render } from '@testing-library/react';
import React from 'react';

import SettingsIcon from './settings-icon';

describe('settings icon component', () => {
  it('should render without props', () => {
    const { container } = render(<SettingsIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
