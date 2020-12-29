import PropTypes from 'prop-types';
import React from 'react';

import Badge from '../../../components/badge';
import { ContractIcon, HelpIcon, WalletIcon } from '../../../components/icons';
import Tooltip from '../../../components/tooltip';
import { COLORS } from '../../../styles/constants';

const AddressTypeBadge = ({ isContract }) => {
  if (isContract === null) {
    return (
      <Tooltip
        content="The type of this address is currently unknown. View on Etherscan for more detail."
        maxWidth="220px"
        placement="top"
      >
        <Badge
          css={`
            align-items: center;
            display: flex;
          `}
        >
          <HelpIcon css="margin-right: 4px;" size={12} />
          Unknown
        </Badge>
      </Tooltip>
    );
  }

  if (isContract) {
    return (
      <Tooltip content="This address is a smart contract." placement="top">
        <Badge
          bgColor={COLORS.ACCENT.ANZAC_400}
          css={`
            align-items: center;
            display: flex;
          `}
          textColor={COLORS.PRIMARY.SCAMPI_800}
        >
          <ContractIcon css="margin-right: 4px;" size={12} />
          Contract
        </Badge>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      content="This address is an externally owned account (EOA)."
      maxWidth="220px"
      placement="top"
    >
      <Badge
        css={`
          align-items: center;
          display: flex;
        `}
      >
        <WalletIcon css="margin-right: 4px;" size={12} />
        EOA
      </Badge>
    </Tooltip>
  );
};

AddressTypeBadge.propTypes = {
  isContract: PropTypes.bool,
};

AddressTypeBadge.defaultProps = {
  isContract: null,
};

export default AddressTypeBadge;
