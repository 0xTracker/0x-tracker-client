import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { DATE_FORMAT, ETH_TOKEN, ZRX_TOKEN } from '../../../constants';
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
import FillStatusBadge from './fill-status-badge';
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

const PriceBadge = styled(Badge).attrs({
  bgColor: COLORS.PRIMARY.SCAMPI_100,
  textColor: 'inherit',
})`
  margin-left: 0.5rem;
`;

const FillDetailLink = styled(Link)`
  color: ${COLORS.PRIMARY.SCAMPI_500};
`;

const FillDetails = ({ fill }) => {
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

      {fill.senderAddress && (
        <FillDetail
          title="Sender Address"
          tooltip="Ethereum address that is allowed to call Exchange contract methods that affect this order."
        >
          <FillDetailLink as={SearchLink} searchQuery={fill.senderAddress}>
            {fill.senderAddress}
          </FillDetailLink>
        </FillDetail>
      )}

      <FillDetail
        title="Date"
        tooltip="Date at which the associated Ethereum transaction's block was mined."
      >
        {formatDate(fill.date, DATE_FORMAT.FULL)}
      </FillDetail>

      <FillDetail
        title="Relayer"
        tooltip="The 0x relayer which facilitated the exchange of assets. 0x relayers connect makers with takers."
      >
        <FillRelayerLink fill={fill} showImage />
      </FillDetail>

      <FillDetail
        title="Status"
        tooltip="Status of the associated Ethereum transaction."
      >
        <FillStatusBadge>{fill.status}</FillStatusBadge>
      </FillDetail>

      <FillDetail
        title="0x Protocol"
        tooltip="Version of the 0x protocol that this order was created on."
      >
        v{fill.protocolVersion}
      </FillDetail>

      {_.has(fill.value, 'USD') && (
        <FillDetail
          title={`Value (${displayCurrency})`}
          tooltip={`Value of the trade in ${displayCurrency}`}
        >
          <LocalisedAmount amount={fill.value.USD} />
        </FillDetail>
      )}

      <FillDetail title="Maker" tooltip="The party that created the order.">
        <FillDetailLink address={fill.makerAddress} as={TraderLink}>
          {fill.makerAddress}
        </FillDetailLink>
      </FillDetail>

      <FillDetail
        title="Taker"
        tooltip="The party that filled this portion of the order."
      >
        <FillDetailLink address={fill.takerAddress} as={TraderLink}>
          {fill.takerAddress}
        </FillDetailLink>
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

      {bridgedAsset !== undefined && (
        <FillDetail
          title="Asset Bridge"
          tooltip="Address of the bridge contract used to supply maker assets."
        >
          <EthereumAddressLink address={bridgedAsset.bridgeAddress}>
            {bridgedAsset.bridgeName || bridgedAsset.bridgeAddress}
          </EthereumAddressLink>
        </FillDetail>
      )}

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
                <PriceBadge>
                  <LocalisedAmount
                    amount={asset.price.USD}
                    preferredPrecision={asset.price.USD < 1 ? 5 : 2}
                  />
                </PriceBadge>
              </ListItem>
            ))}
          </List>
        )}
      </FillDetail>

      {fill.makerFee !== undefined && (
        <FillDetail
          title="Maker Fee"
          tooltip="Fee that was charged to the maker."
        >
          {fill.makerFee.ZRX !== '0' ? (
            <TokenAmount
              amount={fill.makerFee.ZRX}
              linked={false}
              token={ZRX_TOKEN}
            />
          ) : (
            'None'
          )}
        </FillDetail>
      )}

      {fill.takerFee !== undefined && (
        <FillDetail
          title="Taker Fee"
          tooltip="Fee that was charged to the taker."
        >
          {fill.takerFee.ZRX !== '0' ? (
            <TokenAmount
              amount={fill.takerFee.ZRX}
              linked={false}
              token={ZRX_TOKEN}
            />
          ) : (
            'None'
          )}
        </FillDetail>
      )}

      {fill.fees !== undefined && (
        <>
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
        </>
      )}

      <FillDetail
        title="Fee Recipient"
        tooltip="Ethereum address which received any associated maker/taker fees."
      >
        <FillDetailLink address={fill.feeRecipient} as={EthereumAddressLink}>
          {fill.feeRecipient}
        </FillDetailLink>
      </FillDetail>

      {fill.protocolFee !== undefined ? (
        <FillDetail
          title="Protocol Fee"
          tooltip="Protocol fee collected for processing this fill. Protocol fees are used to incentivize makers & fund community development."
        >
          <TokenAmount
            amount={fill.protocolFee.ETH}
            linked={false}
            token={ETH_TOKEN}
          />
          {fill.protocolFee.USD !== undefined ? (
            <PriceBadge>
              <LocalisedAmount
                amount={fill.protocolFee.USD}
                preferredPrecision={fill.protocolFee.USD < 1 ? 5 : 2}
              />
            </PriceBadge>
          ) : null}
        </FillDetail>
      ) : null}
    </FillDetailList>
  );
};

FillDetails.propTypes = {
  fill: fillsPropTypes.fill.isRequired,
};

export default FillDetails;
