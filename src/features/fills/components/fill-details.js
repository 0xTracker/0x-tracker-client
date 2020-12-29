import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { DATE_FORMAT, ETH_TOKEN } from '../../../constants';
import { media } from '../../../styles/util';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import Badge from '../../../components/badge';
import fillsPropTypes from '../prop-types';
import FillAssetsList from './fill-assets-list';
import FillDetail from './fill-detail';
import FillDetailsApps from './fill-details-apps';
import FillFeesList from './fill-fees-list';
import formatDate from '../../../util/format-date';
import Link from '../../../components/link';
import LocalisedAmount from '../../currencies/components/localised-amount';
import SearchLink from '../../search/components/search-link';
import TokenAmount from '../../tokens/components/token-amount';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';
import { EtherscanIcon } from '../../../components/icons';
import Tooltip from '../../../components/tooltip';
import CopyToClipboardButton from './copy-to-clipboard-button';
import Visible from '../../../components/visible';

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

const FillDetails = ({ fill }) => {
  const breakpoint = useCurrentBreakpoint();
  const displayCurrency = useDisplayCurrency();

  return (
    <FillDetailList>
      <FillDetail
        title="Date"
        tooltip="Date at which the associated Ethereum transaction's block was mined."
      >
        {formatDate(fill.date, DATE_FORMAT.FULL)}
      </FillDetail>

      <FillDetail
        title="Transaction Hash"
        tooltip="Hash of the Ethereum transaction which processed this fill."
      >
        <FillDetailLink as={SearchLink} searchQuery={fill.transactionHash}>
          {fill.transactionHash}
        </FillDetailLink>
        <Visible above="md">
          <Tooltip content="View transaction on Etherscan" placement="top">
            <Link
              css="margin-left: 16px;"
              href={`https://etherscan.io/tx/${fill.transactionHash}`}
            >
              <EtherscanIcon size={16} />
            </Link>
          </Tooltip>
          <CopyToClipboardButton
            css="margin-left: 8px;"
            text={fill.transactionHash}
            title="Copy transaction hash to clipboard"
          />
        </Visible>
      </FillDetail>

      <FillDetail
        title="Order Hash"
        tooltip="Unique hash of the order which this fill relates to."
      >
        {fill.orderHash ? (
          <>
            <FillDetailLink as={SearchLink} searchQuery={fill.orderHash}>
              {fill.orderHash}
            </FillDetailLink>
            <Visible above="md">
              <CopyToClipboardButton
                css="margin-left: 16px;"
                text={fill.orderHash}
                title="Copy order hash to clipboard"
              />
            </Visible>
          </>
        ) : (
          'None'
        )}
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
        title="Associated Apps"
        tooltip="The 0x apps which facilitated the trade by relaying orders or consuming 0x liquidity."
      >
        <FillDetailsApps apps={fill.apps} />
      </FillDetail>

      <FillDetail
        title="Traded Assets"
        tooltip="The assets which were exchanged in this trade."
      >
        <FillAssetsList
          assets={fill.assets}
          condensed={breakpoint.lessThan('lg')}
        />
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
    </FillDetailList>
  );
};

FillDetails.propTypes = {
  fill: fillsPropTypes.fill.isRequired,
};

export default FillDetails;
