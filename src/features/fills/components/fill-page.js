/* eslint-disable react/jsx-max-depth */
import _ from 'lodash';
import { compose, mapProps } from 'recompose';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { DATE_FORMAT, URL, ZRX_TOKEN } from '../../../constants';
import { media } from '../../../styles/util';
import AddressLink from '../../addresses/components/address-link';
import AssetLabel from './asset-label';
import buildFillUrl from '../util/build-fill-url';
import buildSearchUrl from '../../search/util/build-search-url';
import Card from '../../../components/card';
import EthereumAddressLink from '../../../components/ethereum-address-link';
import FillAssetsList from './fill-assets-list';
import FillDetail from './fill-detail';
import FillRelayerLink from './fill-relayer-link';
import FillStatusLabel from './fill-status-label';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';
import List from '../../../components/list';
import ListItem from '../../../components/list-item';
import LoadingPage from '../../../components/loading-page';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PageLayout from '../../../components/page-layout';
import PageNotFound from '../../../components/page-not-found';
import SearchLink from '../../search/components/search-link';
import TokenAmount from '../../tokens/components/token-amount';
import useFill from '../hooks/use-fill';

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

const PriceBadge = styled.span.attrs({ className: 'badge' })`
  background-color: ${colors.mischka};
  margin-left: 0.5rem;
`;

const FillPage = ({ fillId, screenSize }) => {
  const { data: fill, error, loading } = useFill(fillId);

  if (error) {
    throw error;
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (fill === undefined) {
    return <PageNotFound />;
  }

  const assetsWithPrices = _.filter(fill.assets, asset =>
    _.isObject(asset.price),
  );

  return (
    <>
      <Helmet>
        <title>Fill Details</title>
      </Helmet>
      <PageLayout
        breadcrumbItems={[
          { title: 'Fills', url: URL.FILLS },
          {
            title: 'Fill Details',
            url: buildFillUrl(fillId),
          },
        ]}
        title="Fill Details"
      >
        <Card css="padding: 2rem;" fullHeight>
          <>
            <FillDetailList>
              <FillDetail title="Transaction Hash">
                <Link href={`https://etherscan.io/tx/${fill.transactionHash}`}>
                  {fill.transactionHash}
                </Link>
              </FillDetail>
              <FillDetail title="Order Hash">
                <Link href={buildSearchUrl(fill.orderHash)}>
                  {fill.orderHash}
                </Link>
              </FillDetail>
              {fill.senderAddress && (
                <FillDetail title="Sender Address">
                  <SearchLink searchQuery={fill.senderAddress}>
                    {fill.senderAddress}
                  </SearchLink>
                </FillDetail>
              )}
              <FillDetail title="Date">
                {formatDate(fill.date, DATE_FORMAT.FULL)}
              </FillDetail>
              <FillDetail title="Relayer">
                <FillRelayerLink fill={fill} showImage />
              </FillDetail>
              <FillDetail title="Status">
                <FillStatusLabel status={fill.status} />
              </FillDetail>
              <FillDetail title="0x Protocol">
                v{fill.protocolVersion}
              </FillDetail>
              {_.has(fill.value, 'USD') && (
                <FillDetail title="Value">
                  <LocalisedAmount amount={fill.value.USD} />
                </FillDetail>
              )}
              <FillDetail title="Maker Address">
                <AddressLink address={fill.makerAddress}>
                  {fill.makerAddress}
                </AddressLink>
              </FillDetail>
              <FillDetail title="Taker Address">
                <AddressLink address={fill.takerAddress}>
                  {fill.takerAddress}
                </AddressLink>
              </FillDetail>
              <FillDetail title="Maker Assets">
                <FillAssetsList
                  assets={_.filter(fill.assets, { traderType: 'maker' })}
                  condensed={screenSize.lessThan.sm}
                />
              </FillDetail>
              <FillDetail title="Taker Assets">
                <FillAssetsList
                  assets={_.filter(fill.assets, { traderType: 'taker' })}
                  condensed={screenSize.lessThan.sm}
                />
              </FillDetail>
              <FillDetail title="Maker Fee">
                {fill.makerFee.ZRX !== '0' ? (
                  <TokenAmount amount={fill.makerFee.ZRX} token={ZRX_TOKEN} />
                ) : (
                  'None'
                )}
              </FillDetail>
              <FillDetail title="Taker Fee">
                {fill.takerFee.ZRX !== '0' ? (
                  <TokenAmount amount={fill.takerFee.ZRX} token={ZRX_TOKEN} />
                ) : (
                  'None'
                )}
              </FillDetail>

              {fill.totalFees.ZRX !== '0' && (
                <FillDetail title="Total Fees">
                  <TokenAmount amount={fill.totalFees.ZRX} token={ZRX_TOKEN} />
                </FillDetail>
              )}

              <FillDetail title="Fee Recipient">
                <EthereumAddressLink address={fill.feeRecipient}>
                  {fill.feeRecipient}
                </EthereumAddressLink>
              </FillDetail>

              <FillDetail last title="Derived Prices">
                {assetsWithPrices.length === 0 ? (
                  'None'
                ) : (
                  <List>
                    {assetsWithPrices.map(asset => (
                      <ListItem key={`${asset.tokenAddress}-${asset.tokenId}`}>
                        <AssetLabel asset={asset} />
                        <PriceBadge>
                          <LocalisedAmount amount={asset.price.USD} />
                        </PriceBadge>
                      </ListItem>
                    ))}
                  </List>
                )}
              </FillDetail>
            </FillDetailList>
          </>
        </Card>
      </PageLayout>
    </>
  );
};

FillPage.propTypes = {
  fillId: PropTypes.string.isRequired,
  screenSize: PropTypes.shape({
    lessThan: PropTypes.shape({
      sm: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

const enhance = compose(
  mapProps(({ match }) => ({ fillId: match.params.id })),
  connect(state => ({
    screenSize: state.screen,
  })),
);

export default enhance(FillPage);

/* eslint-enable react/jsx-max-depth */
