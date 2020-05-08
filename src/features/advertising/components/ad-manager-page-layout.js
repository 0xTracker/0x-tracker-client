import { useWallet } from 'use-wallet';
import { LogOut as SignOutIcon } from 'styled-icons/boxicons-regular';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import Blockie from '../../../components/blockie';
import PageLayout from '../../../components/page-layout';
import SubTitle from '../../../components/sub-title';

const AdManagerPageLayout = ({ children }) => {
  const wallet = useWallet();

  return (
    <PageLayout
      filter={
        wallet.connected ? (
          <button
            css={`
              background: ${COLORS.NEUTRAL.MYSTIC_300};
              border: none;
              border-radius: 4px;
              color: inherit;
              display: flex;
              align-items: center;
              height: 35px;
              font-weight: 500;
              padding: 0 16px;

              &:hover {
                background: ${COLORS.NEUTRAL.MYSTIC_400};
              }
            `}
            onClick={() => wallet.deactivate()}
            type="submit"
          >
            Sign Out
            <SignOutIcon css="margin-left: 8px;" height={20} width={20} />
          </button>
        ) : null
      }
      showBanner={false}
      title={
        <div css="align-items: center; display: flex;">
          {wallet.connected && (
            <Blockie
              css="border-radius: 0.25rem; margin-right: 0.75rem;"
              seed={wallet.account}
              size="35px"
            />
          )}
          <div>
            Ad Manager
            {wallet.connected && <SubTitle>for {wallet.account}</SubTitle>}
          </div>
        </div>
      }
    >
      {children}
    </PageLayout>
  );
};

AdManagerPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdManagerPageLayout;
