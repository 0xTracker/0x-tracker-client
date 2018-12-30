import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import buildTokenUrl from '../util/build-token-url';
import Link from '../../../components/link';

const TokenLink = ({ children, token }) => {
  const tokenDescription = _.isString(token.name) ? token.name : token.address;

  return (
    <Link href={buildTokenUrl(token)}>{children || tokenDescription}</Link>
  );
};

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
