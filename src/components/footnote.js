import PropTypes from 'prop-types';
import React from 'react';

import { AsteriskIcon } from './icons';

const Footnote = ({ children }) => (
  <span>
    {children}
    <AsteriskIcon css="margin-left: 0.5rem;" size="12" />
  </span>
);

Footnote.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footnote;
