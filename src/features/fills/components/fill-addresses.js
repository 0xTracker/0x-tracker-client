import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../../../styles/util';
import fillsPropTypes from '../prop-types';
import FillDetail from './fill-detail';
import FillAddressEntity from './fill-address-entity';

const FillDetailList = styled.dl`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${media.greaterThan('md')`
    display: flex;
    flex-wrap: wrap;
  `};
`;

const FillAddresses = ({ fill }) => {
  const {
    affiliate,
    feeRecipientMetadata,
    maker,
    sender,
    taker,
    transactionFrom,
    transactionTo,
  } = fill;

  const bridgedAsset = _.find(
    fill.assets,
    (asset) => asset.bridgeAddress !== undefined,
  );

  return (
    <FillDetailList>
      {affiliate !== null && (
        <FillDetail
          title="Affiliate"
          tooltip="Ethereum address belonging to the affiliate which coordinated this fill."
        >
          <FillAddressEntity {...affiliate} />
        </FillDetail>
      )}

      {bridgedAsset && (
        <FillDetail
          title="Asset Bridge"
          tooltip="Address of the bridge contract used to supply maker assets."
        >
          <FillAddressEntity {...bridgedAsset.bridge} />
        </FillDetail>
      )}

      {fill.feeRecipient && (
        <FillDetail
          title="Fee Recipient"
          tooltip="Ethereum address which received any associated maker/taker fees."
        >
          <FillAddressEntity {...feeRecipientMetadata} />
        </FillDetail>
      )}

      <FillDetail title="Maker" tooltip="The party that created the order.">
        {maker ? <FillAddressEntity {...maker} defaultValue="None" /> : 'None'}
      </FillDetail>

      {sender && (
        <FillDetail
          title="Sender"
          tooltip="Ethereum address that is allowed to call Exchange contract methods that affect this order."
        >
          <FillAddressEntity {...sender} />
        </FillDetail>
      )}

      <FillDetail
        title="Taker"
        tooltip="The party that filled this portion of the order."
      >
        <FillAddressEntity {...taker} />
      </FillDetail>
      <FillDetail
        title="Transaction From"
        tooltip="Sender of the associated Ethereum transaction."
      >
        <FillAddressEntity {...transactionFrom} />
      </FillDetail>
      <FillDetail
        title="Transaction To"
        tooltip="Receiver of the associated Ethereum transaction."
      >
        <FillAddressEntity {...transactionTo} />
      </FillDetail>
    </FillDetailList>
  );
};

FillAddresses.propTypes = {
  fill: fillsPropTypes.fill.isRequired,
  maker: PropTypes.shape({
    address: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
  taker: PropTypes.shape({
    address: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
};

FillAddresses.defaultProps = {
  maker: undefined,
  taker: undefined,
};

export default FillAddresses;
