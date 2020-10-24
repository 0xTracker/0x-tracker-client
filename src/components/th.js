import PropTypes from 'prop-types';
import React from 'react';

import { HelpIcon } from './icons';
import Tooltip from './tooltip';

const Th = ({ children, tooltip, ...otherProps }) => {
  if (tooltip === undefined) {
    return <th {...otherProps}>{children}</th>;
  }

  return (
    <th {...otherProps}>
      <Tooltip content={tooltip} placement="bottom">
        <span css="align-items: center; display: flex; justify-content: flex-end;">
          {children} <HelpIcon css="margin-left: 0.5rem;" size={18} />
        </span>
      </Tooltip>
    </th>
  );
};

Th.propTypes = {
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.node,
};

Th.defaultProps = {
  tooltip: undefined,
};

export default Th;
