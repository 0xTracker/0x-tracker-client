import { render } from '@testing-library/react';
import React from 'react';

import * as Icons from '.';

it.each(Object.keys(Icons).map((iconName) => [iconName]))(
  'should render %s icon at 20x20',
  (iconName) => {
    // eslint-disable-next-line import/namespace
    const Icon = Icons[iconName];

    const { container } = render(<Icon height={20} width={20} />);

    expect(container.firstChild).toMatchSnapshot();
  },
);

it.each(Object.keys(Icons).map((iconName) => [iconName]))(
  'should render %s icon at 50x50',
  (iconName) => {
    // eslint-disable-next-line import/namespace
    const Icon = Icons[iconName];

    const { container } = render(<Icon height={50} width={50} />);

    expect(container.firstChild).toMatchSnapshot();
  },
);
