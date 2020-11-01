import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { HelpIcon } from './icons';
import ThSortIcon from './th-sort-icon';
import Tooltip from './tooltip';

const StyledTh = styled.th`
  cursor: ${(props) => (props.sortable ? 'pointer' : 'initial')};
`;

const Th = ({
  children,
  onSort,
  sortDirection,
  sortable,
  tooltip,
  ...otherProps
}) => {
  const props = {
    onClick: sortable
      ? () => {
          if (sortDirection === 'desc') {
            onSort('asc');
          } else if (sortDirection === 'asc') {
            onSort('desc');
          } else {
            onSort('desc');
          }
        }
      : undefined,
    sortable,
  };

  if (tooltip === undefined) {
    return (
      <StyledTh {...props} {...otherProps}>
        {sortDirection !== undefined && (
          <ThSortIcon
            css="margin-right: 0.25rem;"
            direction={sortDirection}
            size={16}
          />
        )}
        {children}
      </StyledTh>
    );
  }

  return (
    <StyledTh {...props} {...otherProps}>
      <span css="align-items: center; display: flex; justify-content: flex-end;">
        {sortDirection !== undefined && (
          <ThSortIcon
            css="margin-right: 0.25rem;"
            direction={sortDirection}
            size={16}
          />
        )}
        {children}{' '}
        <Tooltip content={tooltip} placement="bottom">
          <HelpIcon css="margin-left: 0.5rem;" size={18} />
        </Tooltip>
      </span>
    </StyledTh>
  );
};

Th.propTypes = {
  children: PropTypes.node.isRequired,
  onSort: PropTypes.func,
  sortDirection: PropTypes.string,
  sortable: PropTypes.bool,
  tooltip: PropTypes.node,
};

Th.defaultProps = {
  onSort: undefined,
  sortDirection: undefined,
  sortable: false,
  tooltip: undefined,
};

export default Th;
