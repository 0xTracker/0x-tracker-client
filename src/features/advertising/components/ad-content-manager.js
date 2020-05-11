import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { DATE_FORMAT } from '../../../constants';
import { formatDate } from '../../../util';
import { COLORS } from '../../../styles/constants';
import AdContentForm from './ad-content-form';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';
import Link from '../../../components/link';
import LoadingIndicator from '../../../components/loading-indicator';
import Pill from '../../../components/pill';
import useAdSlotContent from '../hooks/use-ad-slot-content';
import useAdContentManager from '../hooks/use-ad-content-manager';

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const MESSAGES = {
  accepted: (
    <Message>
      Your previous submission for this ad slot has been{' '}
      <strong
        css={`
          color: ${COLORS.ACCENT.FRUIT_SALAD_500};
        `}
      >
        accepted
      </strong>
      . You can update and submit again below if you would like to make changes.
    </Message>
  ),
  new: (
    <Message>
      Fill out your preferred ad content below and submit. You&rsquo;ll be asked
      to sign the submission to verify your ownership of the slot, there is no
      cost for doing this.
    </Message>
  ),
  pending: (
    <Message>
      Your previous submission for this ad slot is{' '}
      <strong
        css={`
          color: ${COLORS.PRIMARY.SCAMPI_500};
        `}
      >
        pending
      </strong>{' '}
      and will be reviewed soon. You can update and submit again below if you
      would like to make changes.
    </Message>
  ),
  rejected: (
    <Message>
      Your previous submission for this ad slot has been{' '}
      <strong
        css={`
          color: ${COLORS.ACCENT.POMEGRANATE_500};
        `}
      >
        rejected
      </strong>
      . An email will be sent with the rejection reason. You can re-submit with
      new content at any time below.
    </Message>
  ),
};

const formatSlotDate = (date) =>
  formatDate(date, DATE_FORMAT.COMPACT, { timezone: false });

const AdContentManager = ({ adSlot }) => {
  const { tokenAddress, tokenId } = adSlot;
  const [content, loadingContent] = useAdSlotContent(tokenAddress, tokenId);
  const submitContent = useAdContentManager(tokenAddress, tokenId);

  const handleSubmit = (values) => {
    // TODO: Disable form

    submitContent(values)
      .then(() => {
        alert('done');
        // Enable form
        // Show success confirmation
      })
      .catch((error) => {
        // TODO: Handle errors gracefully
        throw error;
      });
  };

  if (loadingContent) {
    return (
      <Card>
        <CardBody padded>
          <LoadingIndicator centered />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardHeading>
          Slot: {formatSlotDate(adSlot.slotStartTime)} to{' '}
          {formatSlotDate(adSlot.slotEndTime)}
        </CardHeading>
        <Pill
          as={Link}
          href={`https://etherscan.io/token/${tokenAddress}?a=${tokenId}`}
        >
          View on Etherscan
          <img
            css="margin-left: 8px; height: 12px; width: 12px;"
            src="https://etherscan.io/images/brandassets/etherscan-logo-circle.png"
          />
        </Pill>
      </CardHeader>
      <CardBody css="padding: 2rem;">
        {MESSAGES[content === undefined ? 'new' : content.submissionStatus]}
        <AdContentForm defaultValues={content} onSubmit={handleSubmit} />
      </CardBody>
    </Card>
  );
};

AdContentManager.propTypes = {
  adSlot: PropTypes.shape({
    slotEndTime: PropTypes.instanceOf(Date).isRequired,
    slotStartTime: PropTypes.instanceOf(Date).isRequired,
    tokenAddress: PropTypes.string.isRequired,
    tokenId: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdContentManager;
