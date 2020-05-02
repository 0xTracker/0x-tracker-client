import React from 'react';

import { COLORS } from '../styles/constants';
import Card from './card';
import CardBody from './card-body';
import CardHeader from './card-header';
import CardHeading from './card-heading';
import CardPlaceholder from './card-placeholder';
import LoadingIndicator from './loading-indicator';

const config = {
  component: Card,
  decorators: [(storyFn) => <div css="padding: 30px;">{storyFn()}</div>],
  parameters: {
    backgrounds: [
      { default: true, name: 'Body', value: COLORS.NEUTRAL.MYSTIC_200 },
    ],
  },
  title: 'Common|Card',
};

const content =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat convallis mi ut facilisis. Proin ut magna volutpat, interdum quam in, bibendum risus. Cras a scelerisque sapien. Pellentesque neque nibh, dictum non tincidunt ut, viverra eget tellus. Donec at sodales arcu. Fusce nec molestie nulla, ac porta massa. In hac habitasse platea dictumst. Nulla pellentesque lacus in metus hendrerit fermentum sit amet auctor neque. Fusce diam neque, volutpat et aliquet vitae, eleifend quis odio. Sed vehicula massa sit amet augue vestibulum hendrerit. Vestibulum tincidunt mauris in elementum euismod. Quisque et velit bibendum, hendrerit dolor vitae, vestibulum lectus. Mauris dictum nisl et quam interdum, sed euismod ipsum tincidunt. Phasellus vestibulum mi eu sapien euismod, vitae tempus lacus vestibulum. Aliquam erat volutpat. ';

const Simple = () => (
  <Card>
    <CardBody padded>{content}</CardBody>
  </Card>
);

const WithPlaceholder = () => (
  <Card>
    <CardHeader>
      <CardHeading>Content Card</CardHeading>
    </CardHeader>
    <CardBody padded>
      <CardPlaceholder>
        No trading activity has been recorded for this token on known relayers
        in the selected period.
      </CardPlaceholder>
    </CardBody>
  </Card>
);

const WithHeading = () => (
  <Card>
    <CardHeader>
      <CardHeading>Content Card</CardHeading>
    </CardHeader>
    <CardBody padded>{content}</CardBody>
  </Card>
);

const Loading = () => (
  <Card css="min-height: 500px;">
    <CardBody padded>
      <LoadingIndicator centered />
    </CardBody>
  </Card>
);

export { Loading, Simple, WithHeading, WithPlaceholder };
export default config;
