import React from 'react';

import { COLORS } from '../styles/constants';

const ContactButton = () => (
  <a
    css={`
      background: ${COLORS.ACCENT.ANZAC_500};
      border-radius: 50%;
      box-shadow: 0 10px 24px 0 rgba(54, 61, 77, 0.15) !important;
      color: ${COLORS.ACCENT.ANZAC_1000};
      padding: 16px;
      position: fixed;
      bottom: 18px;
      right: 18px;

      &:hover {
        background: ${COLORS.ACCENT.ANZAC_400};
        color: ${COLORS.ACCENT.ANZAC_1000};
      }
    `}
    dataMode="popup"
    href="https://0xtracker.typeform.com/to/HfuuTK"
    rel="noopener noreferrer"
    target="_blank"
  >
    <svg
      fill="currentColor"
      focusable="false"
      height={32}
      role="img"
      viewBox="0 0 24 24"
      width={32}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
  </a>
);

export default ContactButton;
