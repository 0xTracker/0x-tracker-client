const useTableSort = ({ onSort, sortBy, sortDirection }) => {
  const getSortableColumnProps = (field) => {
    const simpleProps = {
      onSort: (direction) => {
        onSort(field, direction);
      },
      sortable: true,
    };

    if (sortBy === field) {
      return { ...simpleProps, sortDirection };
    }

    return simpleProps;
  };

  return { getSortableColumnProps };
};

export default useTableSort;
