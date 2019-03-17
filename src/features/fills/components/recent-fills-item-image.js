import { Users as PeerToPeerIcon } from 'styled-icons/icomoon/Users';
import { QuestionCircle as UnknownIcon } from 'styled-icons/fa-solid/QuestionCircle';
import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../../../styles/constants';
import RelayerLink from '../../relayers/components/relayer-link';
import SearchLink from '../../search/components/search-link';

const RecentFillsItemImage = ({ fill }) => {
  if (fill.relayer) {
    return (
      <RelayerLink css="color: currentColor;" relayer={fill.relayer}>
        <img
          alt=""
          css="width: 50px; height: 50px; margin-right: 1rem; border-radius: 0.25rem;"
          src={fill.relayer.imageUrl}
        />
      </RelayerLink>
    );
  }

  if (fill.feeRecipient === '0x0000000000000000000000000000000000000000') {
    return (
      <PeerToPeerIcon
        color={colors.stormGray}
        css="margin-right: 1rem;"
        width={50}
      />
    );
  }

  return (
    <SearchLink searchQuery={fill.feeRecipient}>
      <UnknownIcon
        color={colors.stormGray}
        css="margin-right: 1rem;"
        width={50}
      />
    </SearchLink>
  );
};

RecentFillsItemImage.propTypes = {
  fill: PropTypes.object.isRequired,
};

export default RecentFillsItemImage;
