import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { DATE_FORMAT, ETH_TOKEN } from '../../../constants';
import { media } from '../../../styles/util';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import AssetLabel from './asset-label';
import Badge from '../../../components/badge';
import EthereumAddressLink from '../../../components/ethereum-address-link';
import fillsPropTypes from '../prop-types';
import FillAssetsList from './fill-assets-list';
import FillDetail from './fill-detail';
import FillFeesList from './fill-fees-list';
import FillRelayerLink from './fill-relayer-link';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';
import List from '../../../components/list';
import ListItem from '../../../components/list-item';
import LocalisedAmount from '../../currencies/components/localised-amount';
import SearchLink from '../../search/components/search-link';
import TokenAmount from '../../tokens/components/token-amount';
import TraderLink from '../../traders/components/trader-link';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

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

const FillDetails = ({ fill, maker, taker }) => {
  const breakpoint = useCurrentBreakpoint();
  const displayCurrency = useDisplayCurrency();
  const assetsWithPrices = _.filter(fill.assets, (asset) =>
    _.isObject(asset.price),
  );
  const bridgedAsset = _.find(
    fill.assets,
    (asset) => asset.bridgeAddress !== undefined,
  );

  return (
    <FillDetailList>
      <FillDetail
        title="Transaction Hash"
        tooltip="Hash of the Ethereum transaction which processed this fill."
      >
        <FillDetailLink
          href={`https://etherscan.io/tx/${fill.transactionHash}`}
          indicateExternal
        >
          {fill.transactionHash}
        </FillDetailLink>
      </FillDetail>

      <FillDetail
        title="Order Hash"
        tooltip="Unique hash of the order which this fill relates to."
      >
        <FillDetailLink as={SearchLink} searchQuery={fill.orderHash}>
          {fill.orderHash}
        </FillDetailLink>
      </FillDetail>

      <FillDetail
        title="Sender Address"
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
        title="Date"
        tooltip="Date at which the associated Ethereum transaction's block was mined."
      >
        {formatDate(fill.date, DATE_FORMAT.FULL)}
      </FillDetail>

      <FillDetail
        title={`Value (${displayCurrency})`}
        tooltip={`Value of the trade in ${displayCurrency}`}
      >
        {_.has(fill.value, 'USD') ? (
          <LocalisedAmount amount={fill.value.USD} />
        ) : (
          'Unknown'
        )}
      </FillDetail>

      <FillDetail
        title="Protocol Version"
        tooltip="Version of the 0x protocol that this order was created on."
      >
        v{fill.protocolVersion}
      </FillDetail>

      <FillDetail
        title="Protocol Fee"
        tooltip="Protocol fee collected for processing this fill. Protocol fees were introduced in v3 and are used to incentivize makers & fund community development."
      >
        {fill.protocolFee !== undefined ? (
          <>
            <TokenAmount
              amount={fill.protocolFee.ETH}
              linked={false}
              token={ETH_TOKEN}
            />
            {fill.protocolFee.USD !== undefined ? (
              <Badge css="margin-left: 8px;">
                <LocalisedAmount
                  amount={fill.protocolFee.USD}
                  preferredPrecision={fill.protocolFee.USD < 1 ? 5 : 2}
                />
              </Badge>
            ) : null}
          </>
        ) : (
          'None'
        )}
      </FillDetail>

      <FillDetail
        title="Relayer"
        tooltip="The 0x relayer which facilitated the exchange of assets. 0x relayers connect makers with takers."
      >
        <FillRelayerLink fill={fill} showImage />
      </FillDetail>

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

      <FillDetail
        title="Maker Assets"
        tooltip="The assets being provided by the maker for exchange."
      >
        <FillAssetsList
          assets={_.filter(fill.assets, { traderType: 'maker' })}
          condensed={breakpoint.lessThan('sm')}
        />
      </FillDetail>

      <FillDetail
        title="Taker Assets"
        tooltip="The assets being provided by the taker for exchange."
      >
        <FillAssetsList
          assets={_.filter(fill.assets, { traderType: 'taker' })}
          condensed={breakpoint.lessThan('sm')}
        />
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
        title={`Derived Prices (${displayCurrency})`}
        tooltip="Prices of tokens derived from the value of this fill."
      >
        {assetsWithPrices.length === 0 ? (
          'None'
        ) : (
          <List>
            {assetsWithPrices.map((asset) => (
              <ListItem key={`${asset.tokenAddress}-${asset.tokenId}`}>
                <AssetLabel asset={asset} linked={false} />
                <Badge css="margin-left: 8px;">
                  <LocalisedAmount
                    amount={asset.price.USD}
                    preferredPrecision={asset.price.USD < 1 ? 5 : 2}
                  />
                </Badge>
              </ListItem>
            ))}
          </List>
        )}
      </FillDetail>

      <FillDetail
        title="Maker Fees"
        tooltip="Relayer fees that were charged to the maker."
      >
        <FillFeesList
          condensed={breakpoint.lessThan('sm')}
          fees={_.filter(fill.fees, { traderType: 'maker' })}
        />
      </FillDetail>

      <FillDetail
        title="Taker Fees"
        tooltip="Relayer fees that were charged to the taker."
      >
        <FillFeesList
          condensed={breakpoint.lessThan('sm')}
          fees={_.filter(fill.fees, { traderType: 'taker' })}
        />
      </FillDetail>

      <FillDetail
        title="Fee Recipient"
        tooltip="Ethereum address which received any associated maker/taker fees."
      >
        <FillDetailLink address={fill.feeRecipient} as={EthereumAddressLink}>
          {fill.feeRecipient}
        </FillDetailLink>
      </FillDetail>
    </FillDetailList>
  );
};

FillDetails.propTypes = {
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

FillDetails.defaultProps = {
  maker: undefined,
  taker: undefined,
};

export default FillDetails;
