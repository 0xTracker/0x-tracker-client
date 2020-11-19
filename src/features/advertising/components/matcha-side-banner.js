import React from 'react';
// import styled from 'styled-components'

import Link from '../../../components/link';

const MatchaSideBanner = () => (
  <Link
    css="max-width: 100%; margin: 0 12px 12px 12px; border-radius: 4px;"
    href="https://matcha.xyz/?utm_source=0xtracker&utm_medium=banner&utm_campaign=allthetokens"
  >
    <img
      alt="1000+ tokens available on Matcha"
      css="max-width: 100%; border-radius: 0.25rem;"
      src="/assets/advertising/matcha-side-banner.png"
    />
  </Link>
);

export default MatchaSideBanner;
