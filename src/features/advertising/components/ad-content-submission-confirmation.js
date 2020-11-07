import { SpeechBubble } from 'react-kawaii';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../../../styles/constants';
import Dialog from '../../../components/dialog';

const AdContentSubmissionConfirmation = ({ onClose }) => (
  <Dialog
    css="flex-direction: column; display: flex; align-items: center; justify-content: center;"
    height={350}
    onClose={onClose}
    width={450}
  >
    <SpeechBubble color={COLORS.NEUTRAL.MYSTIC_400} mood="happy" size={80} />
    <p css="font-size: 18px; margin: 32px; text-align: center;">
      Thanks for your submission. We&rsquo;ll review your request and notify you
      by email when it has been processed.
    </p>
    <button
      css={`
        background: none;
        border: none;
        padding: 0;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 500;
        color: ${COLORS.ACCENT.ANZAC_600};
      `}
      onClick={onClose}
      type="submit"
    >
      OK, COOL
    </button>
  </Dialog>
);

AdContentSubmissionConfirmation.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AdContentSubmissionConfirmation;
