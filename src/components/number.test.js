import { render } from '@testing-library/react';
import React from 'react';

import Number from './number';

it('should not format 999', () => {
  const { asFragment } = render(<Number>{999}</Number>);

  expect(asFragment()).toMatchSnapshot();
});

it('should format 1000', () => {
  const { asFragment } = render(<Number>{1000}</Number>);

  expect(asFragment()).toMatchSnapshot();
});

it('should format 10000', () => {
  const { asFragment } = render(<Number>{10000}</Number>);

  expect(asFragment()).toMatchSnapshot();
});

it('should format 100000', () => {
  const { asFragment } = render(<Number>{100000}</Number>);

  expect(asFragment()).toMatchSnapshot();
});

it('should format 10000000', () => {
  const { asFragment } = render(<Number>{1000000}</Number>);

  expect(asFragment()).toMatchSnapshot();
});

it('should summarize 4530', () => {
  const { asFragment } = render(<Number summarize>{4530}</Number>);

  expect(asFragment()).toMatchSnapshot();
});

it('should summarize 152650', () => {
  const { asFragment } = render(<Number summarize>{152650}</Number>);

  expect(asFragment()).toMatchSnapshot();
});

it('should summarize 7846032', () => {
  const { asFragment } = render(<Number summarize>{7846032}</Number>);

  expect(asFragment()).toMatchSnapshot();
});
