import { cleanup, fireEvent, render } from 'react-testing-library';
import React from 'react';

import FullPaginator from './full-paginator';

const simpleProps = {
  page: 1,
  pageCount: 10,
  pageSize: 15,
  recordCount: 147,
};

afterEach(() => {
  cleanup();
});

it('should render full size paginator', () => {
  const { container } = render(<FullPaginator {...simpleProps} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('should call onPageChange prop when going to specific page', () => {
  const handlePageChange = jest.fn();
  const { getByText } = render(
    <FullPaginator {...simpleProps} onPageChange={handlePageChange} />,
  );
  const link = getByText('3');

  fireEvent.click(link);

  expect(handlePageChange).toHaveBeenCalledTimes(1);
  expect(handlePageChange).toHaveBeenCalledWith(3);
});

it('should call onPageChange prop when going to previous page', () => {
  const handlePageChange = jest.fn();
  const { getByText } = render(
    <FullPaginator {...simpleProps} onPageChange={handlePageChange} page={3} />,
  );
  const link = getByText('Previous');

  fireEvent.click(link);

  expect(handlePageChange).toHaveBeenCalledTimes(1);
  expect(handlePageChange).toHaveBeenCalledWith(2);
});

it('should call onPageChange prop when going to next page', () => {
  const handlePageChange = jest.fn();
  const { getByText } = render(
    <FullPaginator {...simpleProps} onPageChange={handlePageChange} page={3} />,
  );
  const link = getByText('Next');

  fireEvent.click(link);

  expect(handlePageChange).toHaveBeenCalledTimes(1);
  expect(handlePageChange).toHaveBeenCalledWith(4);
});
