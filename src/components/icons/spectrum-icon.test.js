import { render } from '@testing-library/react';
import React from 'react';

import SpectrumIcon from './spectrum-icon';

describe('spectrum icon component', () => {
  it('should render without props', () => {
    const { container } = render(<SpectrumIcon />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
