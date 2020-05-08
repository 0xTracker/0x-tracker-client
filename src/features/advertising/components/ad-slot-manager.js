import { ethers } from 'ethers';
import { useWallet } from 'use-wallet';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { DATE_FORMAT } from '../../../constants';
import { formatDate } from '../../../util';
import { COLORS } from '../../../styles/constants';
import AdContentForm from './ad-content-form';
import AdManagerPageLayout from './ad-manager-page-layout';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import Link from '../../../components/link';
import Pill from '../../../components/pill';

const signMessage = async (message, provider) =>
  provider.getSigner().signMessage(message);

const formatSlotDate = (date) =>
  formatDate(date, DATE_FORMAT.COMPACT, { timezone: false });

const AdSlotManager = ({ adSlots }) => {
  const wallet = useWallet();
  const [signature, setSignature] = useState();
  const [message, setMessage] = useState();
  const [selectedSlotId, setSelectedSlotId] = useState();

  const selectedSlot =
    adSlots.length === 0
      ? undefined
      : adSlots.find(
          (slot, index) =>
            slot.tokenId === selectedSlotId ||
            (selectedSlotId === undefined && index === 0),
        );

  const provider =
    wallet.ethereum !== undefined
      ? new ethers.providers.Web3Provider(wallet.ethereum)
      : undefined;

  const handleSubmit = (values) => {
    const jsonMessage = JSON.stringify({
      ...values,
      slotId: adSlots[0].tokenId,
    });

    signMessage(jsonMessage, provider)
      .then((sig) => {
        setSignature(sig);
        setMessage(jsonMessage);
      })
      .catch(console.error);
  };

  return (
    <AdManagerPageLayout>
      <CardGrid>
        <CardGridRow>
          <CardGridCol lg={8}>
            <Card>
              {selectedSlot !== undefined ? (
                <CardHeader>
                  <CardHeading>
                    Slot: {formatSlotDate(selectedSlot.slotStartTime)} to{' '}
                    {formatSlotDate(selectedSlot.slotEndTime)}
                  </CardHeading>
                  <Pill
                    as={Link}
                    href={`https://etherscan.io/token/${selectedSlot.tokenAddress}?a=${selectedSlot.tokenId}`}
                  >
                    View on Etherscan
                    <img
                      css="margin-left: 8px; height: 12px; width: 12px;"
                      src="https://etherscan.io/images/brandassets/etherscan-logo-circle.png"
                    />
                  </Pill>
                </CardHeader>
              ) : null}
              <CardBody css="padding: 2rem;">
                <p css="margin-bottom: 2rem; max-width: 600px;">
                  Fill out your preferred ad content below and submit.
                  You&rsquo;ll be asked to sign the submission to verify your
                  ownership of the slot, there is no additional cost for doing
                  this.
                </p>
                <AdContentForm onSubmit={handleSubmit} />
                {message !== undefined && (
                  <div
                    css={`
                      margin-top: 30px;
                      background: ${COLORS.NEUTRAL.MYSTIC_200};
                      border-radius: 4px;
                      overflow: scroll;
                      padding: 2rem;
                    `}
                  >
                    <p>Message: {message}</p>
                    <p>Signature: {signature}</p>
                    <p>
                      Signer:{' '}
                      {message &&
                        signature &&
                        ethers.utils.verifyMessage(message, signature)}
                    </p>
                  </div>
                )}
              </CardBody>
            </Card>
          </CardGridCol>
          <CardGridCol lg={4}>
            <Card>
              <CardHeader>
                <CardHeading>Your Ad Slots</CardHeading>
              </CardHeader>
              <CardBody padded>
                <p>
                  The following ad slots belong to the connected Ethereum
                  wallet. Select a slot to manage it.
                </p>
                <ul>
                  {adSlots.map((adSlot) => (
                    <li key={adSlot.tokenId}>
                      <button
                        onClick={() => {
                          setSelectedSlotId(adSlot.tokenId);
                        }}
                        type="submit"
                      >
                        {formatSlotDate(adSlot.slotStartTime)} to{' '}
                        {formatSlotDate(adSlot.slotEndTime)}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </AdManagerPageLayout>
  );
};

AdSlotManager.propTypes = {
  adSlots: PropTypes.arrayOf(
    PropTypes.shape({
      slotEndTime: PropTypes.instanceOf(Date).isRequired,
      slotStartTime: PropTypes.instanceOf(Date).isRequired,
      tokenId: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default AdSlotManager;
