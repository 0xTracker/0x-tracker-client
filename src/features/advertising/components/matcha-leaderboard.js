import React from 'react';

import Badge from '../../../components/badge';
import Link from '../../../components/link';
import { COLORS } from '../../../styles/constants';

const MatchaLeaderboard = () => (
  <Link
    css="position: relative; max-width: 100%; margin: 0 0 2rem 0;"
    href="https://matcha.xyz/?utm_source=0xtracker&utm_medium=banner&utm_campaign=allthetokens"
    rel="nofollow"
  >
    <Badge
      bgColor={COLORS.PRIMARY.SCAMPI_500}
      css="position: absolute; top: -8px; right: 1rem;"
      textColor="white"
    >
      AD
    </Badge>
    <img
      alt="1000+ tokens available on Matcha"
      css="max-width: 100%; border-radius: 0.25rem;"
      src="/assets/advertising/matcha-leaderboard.png"
    />
  </Link>
);

export default MatchaLeaderboard;
