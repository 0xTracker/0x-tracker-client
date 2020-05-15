import React from 'react';

import IconBase from './icon-base';

const ExternalLinkIcon = (props) => (
  <IconBase fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </IconBase>
);

export default ExternalLinkIcon;
