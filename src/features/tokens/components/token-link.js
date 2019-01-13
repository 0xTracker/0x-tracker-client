import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../util/build-token-url';
import Link from '../../../components/link';

const TokenLink = ({ children, token }) => (
  <Link href={buildTokenUrl(token)}>{children}</Link>
);

TokenLink.propTypes = {
  children: PropTypes.node,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
};

TokenLink.defaultProps = {
  children: undefined,
};

export default TokenLink;
