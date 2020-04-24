import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import Link from '../../../components/link';

const TraderLink = ({ address, children, ...otherProps }) => (
  <Link href={URL.TRADER.replace(':address', address)} {...otherProps}>
    {children}
  </Link>
);

TraderLink.propTypes = {
  address: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TraderLink;
