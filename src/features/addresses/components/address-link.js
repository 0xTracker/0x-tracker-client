import PropTypes from 'prop-types';
import React from 'react';

import { URL } from '../../../constants';
import Link from '../../../components/link';

const AddressLink = ({ address, children }) => (
  <Link href={URL.ADDRESS.replace(':address', address)}>{children}</Link>
);

AddressLink.propTypes = {
  address: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AddressLink;
