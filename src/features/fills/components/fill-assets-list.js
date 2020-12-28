import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import AssetAmount from './asset-amount';
import AssetLabel from './asset-label';
import Badge from '../../../components/badge';
import TokenImage from '../../tokens/components/token-image';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Tooltip from '../../../components/tooltip';
import Link from '../../../components/link';
import { EtherscanIcon } from '../../../components/icons';
import CopyToClipboardButton from './copy-to-clipboard-button';
import Visible from '../../../components/visible';

const FillAssetsList = ({ assets, condensed }) => {
  if (assets.length === 0) {
    return null;
  }

  return (
    <div>
      {assets.map((asset) => (
        <div
          css={`
            align-items: center;
            display: flex;
            margin-bottom: 0.75rem;

            &:last-child {
              margin-bottom: 0;
            }
          `}
          key={asset.tokenAddress}
        >
          <TokenImage
            css="margin-right: 8px;"
            imageUrl={asset.tokenImageUrl}
            size={20}
          />
          <span>
            <AssetAmount asset={asset} />{' '}
            <Tooltip
              content={asset.tokenAddress}
              maxWidth="initial"
              placement="top"
            >
              <span>
                <AssetLabel
                  asset={asset}
                  condensed={condensed}
                  css={`
                    color: ${COLORS.PRIMARY.SCAMPI_500};
                  `}
                />
              </span>
            </Tooltip>
          </span>
          <Badge css="margin-left: 16px;" upperCase={false}>
            {_.startCase(asset.traderType)}
          </Badge>
          {asset.price && (
            <Badge
              bgColor={COLORS.PRIMARY.SCAMPI_500}
              css="margin-left: 8px;"
              textColor={COLORS.NEUTRAL.MYSTIC_100}
            >
              1 {asset.tokenSymbol} ={' '}
              <LocalisedAmount
                amount={asset.price.USD}
                preferredPrecision={asset.price.USD < 1 ? 5 : 2}
              />
            </Badge>
          )}
          <Visible above="md">
            <Tooltip content="View token on Etherscan" placement="top">
              <Link
                css="margin-left: 8px;"
                href={`https://etherscan.io/token/${asset.tokenAddress}`}
              >
                <EtherscanIcon size={16} />
              </Link>
            </Tooltip>
            <CopyToClipboardButton
              css="margin-left: 8px;"
              text={asset.tokenAddress}
              title="Copy token address to clipboard"
            />
          </Visible>
        </div>
      ))}
    </div>
  );
};

FillAssetsList.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string,
      tokenAddress: PropTypes.string.isRequired,
      tokenId: PropTypes.number,
      tokenSymbol: PropTypes.string,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  condensed: PropTypes.bool,
};

FillAssetsList.defaultProps = {
  condensed: false,
};

export default FillAssetsList;
