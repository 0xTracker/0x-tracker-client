import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Link from '../../../components/link';
import Tooltip from '../../../components/tooltip';
import SearchLink from '../../search/components/search-link';
import AddressTypeBadge from './address-type-badge';
import { EtherscanIcon } from '../../../components/icons';
import Visible from '../../../components/visible';
import AddressImage from './address-image';
import CopyToClipboardButton from './copy-to-clipboard-button';

const FillDetailLink = styled(Link)`
  align-items: center;
  color: ${COLORS.PRIMARY.SCAMPI_500};
  display: flex;
`;

const FillAddressEntity = ({ address, imageUrl, isContract, name }) => {
  if (_.isString(name)) {
    return (
      <>
        <Tooltip
          content={address}
          interactive
          maxWidth="initial"
          placement="top"
        >
          <span>
            <FillDetailLink as={SearchLink} searchQuery={address}>
              <AddressImage
                address={address}
                css="margin-right: 8px;"
                imageUrl={imageUrl}
                size="20px"
              />
              {name}
            </FillDetailLink>
          </span>
        </Tooltip>
        <Visible above="md">
          <div css="align-items: center; display: flex; margin-left: 32px;">
            <AddressTypeBadge isContract={isContract} />
            <Tooltip content="View address on Etherscan" placement="top">
              <span css="margin-left: 8px;">
                <Link href={`https://etherscan.io/address/${address}`}>
                  <EtherscanIcon size={16} />
                </Link>
              </span>
            </Tooltip>
            <CopyToClipboardButton
              css="margin-left: 8px;"
              text={address}
              title="Copy address to clipboard"
            />
          </div>
        </Visible>
      </>
    );
  }

  return (
    <>
      <FillDetailLink as={SearchLink} searchQuery={address}>
        <AddressImage
          address={address}
          css="margin-right: 8px;"
          imageUrl={imageUrl}
          size="20px"
        />
        {address}
      </FillDetailLink>
      <Visible above="md">
        <div css="align-items: center; display: flex; margin-left: 32px;">
          <AddressTypeBadge isContract={isContract} />
          <Tooltip content="View address on Etherscan" placement="top">
            <span css="margin-left: 8px;">
              <Link href={`https://etherscan.io/address/${address}`}>
                <EtherscanIcon size={16} />
              </Link>
            </span>
          </Tooltip>
          <CopyToClipboardButton
            css="margin-left: 8px;"
            text={address}
            title="Copy address to clipboard"
          />
        </div>
      </Visible>
    </>
  );
};

FillAddressEntity.propTypes = {
  address: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  isContract: PropTypes.bool,
  name: PropTypes.string,
};

FillAddressEntity.defaultProps = {
  imageUrl: null,
  isContract: null,
  name: null,
};

export default FillAddressEntity;
