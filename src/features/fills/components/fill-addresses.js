import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import Badge from '../../../components/badge';
import EthereumAddressLink from '../../../components/ethereum-address-link';
import fillsPropTypes from '../prop-types';
import FillDetail from './fill-detail';
import Link from '../../../components/link';
import SearchLink from '../../search/components/search-link';
import TraderLink from '../../traders/components/trader-link';

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

const FillDetailLink = styled(Link)`
  color: ${COLORS.PRIMARY.SCAMPI_500};
`;

const FillAddresses = ({ fill, maker, taker }) => {
  const bridgedAsset = _.find(
    fill.assets,
    (asset) => asset.bridgeAddress !== undefined,
  );

  return (
    <FillDetailList>
      <FillDetail
        title="Affiliate"
        tooltip="Ethereum address belonging to the affiliate which coordinated this fill."
      >
        {_.isPlainObject(fill.affiliate) ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {_.isString(fill.affiliate.name) ? (
              <div css="display: flex; align-items: center;">
                {fill.affiliate.imageUrl && (
                  <img
                    css="margin-right: 0.5rem; border-radius: 0.25rem;"
                    height={20}
                    src={fill.affiliate.imageUrl}
                    width={20}
                  />
                )}
                {fill.affiliate.name}
                <Badge
                  css="margin-left: 12px; text-transform: none;"
                  upperCase={false}
                >
                  {fill.affiliate.address}
                </Badge>
              </div>
            ) : (
              fill.affiliate.address
            )}
          </>
        ) : (
          'None'
        )}
      </FillDetail>

      <FillDetail
        title="Asset Bridge"
        tooltip="Address of the bridge contract used to supply maker assets."
      >
        {bridgedAsset !== undefined ? (
          <EthereumAddressLink address={bridgedAsset.bridgeAddress}>
            {bridgedAsset.bridgeName || bridgedAsset.bridgeAddress}
          </EthereumAddressLink>
        ) : (
          'None'
        )}
      </FillDetail>

      <FillDetail
        title="Fee Recipient"
        tooltip="Ethereum address which received any associated maker/taker fees."
      >
        {fill.feeRecipient ? (
          <FillDetailLink address={fill.feeRecipient} as={EthereumAddressLink}>
            {fill.feeRecipient}
          </FillDetailLink>
        ) : (
          'None'
        )}
      </FillDetail>

      <FillDetail title="Maker" tooltip="The party that created the order.">
        {maker && _.isString(maker.name) ? (
          <>
            <FillDetailLink address={maker.address} as={TraderLink}>
              {maker.name}
            </FillDetailLink>
            <Badge
              css="margin-left: 16px; text-transform: none;"
              upperCase={false}
            >
              {maker.address}
            </Badge>
          </>
        ) : (
          <FillDetailLink address={maker.address} as={TraderLink}>
            {maker.address}
          </FillDetailLink>
        )}
      </FillDetail>

      <FillDetail
        title="Sender"
        tooltip="Ethereum address that is allowed to call Exchange contract methods that affect this order."
      >
        {fill.senderAddress ? (
          <FillDetailLink as={SearchLink} searchQuery={fill.senderAddress}>
            {fill.senderAddress}
          </FillDetailLink>
        ) : (
          'None'
        )}
      </FillDetail>

      <FillDetail
        title="Taker"
        tooltip="The party that filled this portion of the order."
      >
        {taker && _.isString(taker.name) ? (
          <>
            <FillDetailLink address={taker.address} as={TraderLink}>
              {taker.name}
            </FillDetailLink>
            <Badge
              css="margin-left: 16px; text-transform: none;"
              upperCase={false}
            >
              {taker.address}
            </Badge>
          </>
        ) : (
          <FillDetailLink address={taker.address} as={TraderLink}>
            {taker.address}
          </FillDetailLink>
        )}
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
