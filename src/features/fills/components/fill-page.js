import _ from 'lodash';
import { mapProps } from 'recompose';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { DATE_FORMAT, URL, ZRX_TOKEN } from '../../../constants';
import { media } from '../../../styles/util';
import buildFillUrl from '../util/build-fill-url';
import buildSearchUrl from '../../search/util/build-search-url';
import callApi from '../../../util/call-api';
import Card from '../../../components/card';
import EthereumAddressLink from '../../../components/ethereum-address-link';
import FillDetail from './fill-detail';
import FillRelayerLink from './fill-relayer-link';
import FillStatusLabel from './fill-status-label';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import PageLayout from '../../../components/page-layout';
import TokenAmount from '../../tokens/components/token-amount';
import TokenLink from '../../tokens/components/token-link';

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

class FillPage extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    await this.loadData();
  }

  async componentDidUpdate(prevProps) {
    const { fillId } = this.props;

    if (prevProps.fillId !== fillId) {
      await this.loadData();
    }
  }

  async loadData() {
    const { fillId } = this.props;
    const fill = await callApi(`fills/${fillId}`);

    this.setState({ fill });
  }

  render() {
    const { fillId } = this.props;
    const { fill } = this.state;

    return (
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
          {fill === undefined ? (
            <LoadingIndicator centered />
          ) : (
            <React.Fragment>
              <FillDetailList>
                <FillDetail title="Transaction Hash">
                  <Link
                    href={`https://etherscan.io/tx/${fill.transactionHash}`}
                  >
                    {fill.transactionHash}
                  </Link>
                </FillDetail>
                <FillDetail title="Order Hash">
                  <Link href={buildSearchUrl(fill.orderHash)}>
                    {fill.orderHash}
                  </Link>
                </FillDetail>
                <FillDetail title="Date">
                  {formatDate(fill.date, DATE_FORMAT.FULL)}
                </FillDetail>
                <FillDetail title="Relayer">
                  <FillRelayerLink fill={fill} />
                </FillDetail>
                <FillDetail title="Status">
                  <FillStatusLabel status={fill.status} />
                </FillDetail>
                <FillDetail title="0x Protocol">
                  v{fill.protocolVersion}
                </FillDetail>
              </FillDetailList>
              <FillDetailList>
                <FillDetail title="Trade">
                  <TokenAmount
                    amount={fill.makerAmount}
                    token={fill.makerToken}
                  />{' '}
                  &#8651;{' '}
                  <TokenAmount
                    amount={fill.takerAmount}
                    token={fill.takerToken}
                  />
                </FillDetail>

                {_.has(fill.amount, 'USD') && (
                  <FillDetail title="Value">
                    <LocalisedAmount amount={fill.amount.USD} />
                  </FillDetail>
                )}
              </FillDetailList>
              <FillDetailList>
                <FillDetail title="Maker">
                  <EthereumAddressLink address={fill.makerAddress}>
                    {fill.makerAddress}
                  </EthereumAddressLink>
                </FillDetail>
                <FillDetail title="Maker Token">
                  <TokenLink token={fill.makerToken}>
                    {fill.makerToken.name
                      ? fill.makerToken.name
                      : fill.makerToken.address}
                  </TokenLink>
                </FillDetail>

                {_.has(fill, 'makerPrice.USD') && (
                  <FillDetail title="Maker Price">
                    <LocalisedAmount amount={fill.makerPrice.USD} />
                  </FillDetail>
                )}
              </FillDetailList>
              <FillDetailList>
                <FillDetail title="Taker">
                  <EthereumAddressLink address={fill.takerAddress}>
                    {fill.takerAddress}
                  </EthereumAddressLink>
                </FillDetail>
                <FillDetail title="Taker Token">
                  <TokenLink token={fill.takerToken}>
                    {fill.takerToken.name
                      ? fill.takerToken.name
                      : fill.takerToken.address}
                  </TokenLink>
                </FillDetail>

                {_.has(fill, 'takerPrice.USD') && (
                  <FillDetail title="Taker Price">
                    <LocalisedAmount amount={fill.takerPrice.USD} />
                  </FillDetail>
                )}
              </FillDetailList>
              <FillDetailList>
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
                    <TokenAmount
                      amount={fill.totalFees.ZRX}
                      token={ZRX_TOKEN}
                    />
                  </FillDetail>
                )}

                <FillDetail title="Fee Recipient">
                  <EthereumAddressLink address={fill.feeRecipient}>
                    {fill.feeRecipient}
                  </EthereumAddressLink>
                </FillDetail>
              </FillDetailList>
            </React.Fragment>
          )}
        </Card>
      </PageLayout>
    );
  }
}

FillPage.propTypes = {
  fillId: PropTypes.string.isRequired,
};

export default mapProps(({ match }) => ({ fillId: match.params.id }))(FillPage);
