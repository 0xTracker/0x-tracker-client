import _ from 'lodash';
import { mapProps } from 'recompose';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { DATE_FORMAT, URL, ZRX_TOKEN } from '../../../constants';
import buildFillUrl from '../util/build-fill-url';
import buildSearchUrl from '../../search/util/build-search-url';
import callApi from '../../../util/call-api';
import ContentHeader from '../../../components/content-header';
import ContentSection from '../../../components/content-section';
import EthereumAddressLink from '../../ethereum/components/ethereum-address-link';
import FillRelayerLink from './fill-relayer-link';
import FillStatusLabel from './fill-status-label';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';
import LoadingIndicator from '../../../components/loading-indicator';
import LocalisedAmount from '../../currencies/components/localised-amount';
import TokenAmount from '../../tokens/components/token-amount';
import TokenLink from '../../tokens/components/token-link';

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
    const { fill } = this.state;

    if (fill === undefined) {
      return <LoadingIndicator isCentered />;
    }

    return [
      <ContentHeader
        breadcrumbItems={[
          { title: 'Fills', url: URL.FILLS },
          {
            title: 'Fill Details',
            url: buildFillUrl(fill.id),
          },
        ]}
        key="page-heading"
        title="Fill Details"
      />,
      <ContentSection key="content">
        <div className="fill-details">
          <dl>
            <dt>Transaction Hash</dt>
            <dd>
              <Link href={`https://etherscan.io/tx/${fill.transactionHash}`}>
                {fill.transactionHash}
              </Link>
            </dd>

            <dt>Order Hash</dt>
            <dd>
              <Link href={buildSearchUrl(fill.orderHash)}>
                {fill.orderHash}
              </Link>
            </dd>

            <dt>Date</dt>
            <dd>{formatDate(fill.date, DATE_FORMAT.FULL)}</dd>

            <dt>Relayer</dt>
            <dd>
              <FillRelayerLink fill={fill} />
            </dd>

            <dt>Status</dt>
            <dd>
              <FillStatusLabel status={fill.status} />
            </dd>

            <dt>0x Protocol</dt>
            <dd>v{fill.protocolVersion}</dd>

            <dt className="mt-4">Trade</dt>
            <dd className="mt-md-4">
              <TokenAmount amount={fill.makerAmount} token={fill.makerToken} />{' '}
              &#8651;{' '}
              <TokenAmount amount={fill.takerAmount} token={fill.takerToken} />
            </dd>

            {_.has(fill.amount, 'USD') && (
              <React.Fragment>
                <dt>Value</dt>
                <dd>
                  <LocalisedAmount amount={fill.amount.USD} />
                </dd>
              </React.Fragment>
            )}

            <dt className="mt-4">Maker</dt>
            <dd className="mt-md-4">
              <EthereumAddressLink address={fill.makerAddress} />
            </dd>

            <dt>Maker Token</dt>
            <dd>
              <TokenLink token={fill.makerToken} />
            </dd>

            {_.has(fill, 'makerPrice.USD') && (
              <React.Fragment>
                <dt>Maker Price</dt>
                <dd>
                  <LocalisedAmount amount={fill.makerPrice.USD} />
                </dd>
              </React.Fragment>
            )}

            <dt className="mt-4">Taker</dt>
            <dd className="mt-md-4">
              <EthereumAddressLink address={fill.takerAddress} />
            </dd>

            <dt>Taker Token</dt>
            <dd>
              <TokenLink token={fill.takerToken} />
            </dd>

            {_.has(fill, 'takerPrice.USD') && (
              <React.Fragment>
                <dt>Taker Price</dt>
                <dd>
                  <LocalisedAmount amount={fill.takerPrice.USD} />
                </dd>
              </React.Fragment>
            )}

            <dt className="mt-4">Maker Fee</dt>
            <dd className="mt-md-4">
              {fill.makerFee.ZRX !== '0' ? (
                <TokenAmount amount={fill.makerFee.ZRX} token={ZRX_TOKEN} />
              ) : (
                'None'
              )}
            </dd>

            <dt>Taker Fee</dt>
            <dd>
              {fill.takerFee.ZRX !== '0' ? (
                <TokenAmount amount={fill.takerFee.ZRX} token={ZRX_TOKEN} />
              ) : (
                'None'
              )}
            </dd>

            {fill.totalFees.ZRX !== '0' && (
              <React.Fragment>
                <dt>Total Fees</dt>
                <dd>
                  <TokenAmount amount={fill.totalFees.ZRX} token={ZRX_TOKEN} />
                </dd>
              </React.Fragment>
            )}

            <dt>Fee Recipient</dt>
            <dd>
              <EthereumAddressLink address={fill.feeRecipient} />
            </dd>
          </dl>
        </div>
      </ContentSection>,
    ];
  }
}

FillPage.propTypes = {
  fillId: PropTypes.string.isRequired,
};

export default mapProps(({ match }) => ({ fillId: match.params.id }))(FillPage);
