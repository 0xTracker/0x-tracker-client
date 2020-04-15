import PropTypes from 'prop-types';
import React from 'react';

import { HelpIcon } from './icons';
import Tooltip from './tooltip';

const HelpWidget = ({ children, className }) => (
  <Tooltip content={children}>
    <HelpIcon className={className} height={18} width={18} />
  </Tooltip>
);

HelpWidget.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

HelpWidget.defaultProps = {
  className: undefined,
};

export default HelpWidget;
