import React from 'react';

import { COLORS } from '../styles/constants';
import StatWidget from './stat-widget';

const config = {
  component: StatWidget,
  decorators: [(storyFn) => <div css="max-width: 200px;">{storyFn()}</div>],
  parameters: {
    backgrounds: [
      { default: true, name: 'Body', value: COLORS.NEUTRAL.MYSTIC_300 },
    ],
  },
  title: 'Common|StatWidget',
};

const Loading = () => <StatWidget loading title="Trade Volume" />;

export { Loading };
export default config;
