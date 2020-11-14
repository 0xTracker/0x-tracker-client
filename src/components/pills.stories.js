import { action } from '@storybook/addon-actions';
import React from 'react';

import Card from './card';
import CardBody from './card-body';
import CardHeader from './card-header';
import CardHeading from './card-heading';
import DropdownPill from './dropdown-pill';
import Link from './link';
import Pill from './pill';

const AsLink = () => (
  <Pill as={Link} href="/tokens">
    View More
  </Pill>
);

const Dropdown = () => (
  <DropdownPill
    onChange={action('change')}
    options={[
      { label: 'Apps', value: 'apps' },
      { label: 'Asset Bridges', value: 'asset-bridges' },
      { label: 'Tokens', value: 'tokens' },
    ]}
    value="apps"
  >
    View More
  </DropdownPill>
);

const config = {
  argTypes: { onClick: { action: 'clicked' } },
  decorators: [
    (storyFn) => (
      <Card css="max-width: 500px;">
        <CardHeader>
          <CardHeading>Demonstration</CardHeading>
          {storyFn()}
        </CardHeader>
        <CardBody padded>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          consequat convallis mi ut facilisis. Proin ut magna volutpat, interdum
          quam in, bibendum risus. Cras a scelerisque sapien. Pellentesque neque
          nibh, dictum non tincidunt ut, viverra eget tellus. Donec at sodales
          arcu. Fusce nec molestie nulla, ac porta massa. In hac habitasse
          platea dictumst. Nulla pellentesque lacus in metus hendrerit fermentum
          sit amet auctor neque. Fusce diam neque, volutpat et aliquet vitae,
          eleifend quis odio. Sed vehicula massa sit amet augue vestibulum
          hendrerit. Vestibulum tincidunt mauris in elementum euismod. Quisque
          et velit bibendum, hendrerit dolor vitae, vestibulum lectus. Mauris
          dictum nisl et quam interdum, sed euismod ipsum tincidunt. Phasellus
          vestibulum mi eu sapien euismod, vitae tempus lacus vestibulum.
          Aliquam erat volutpat.
        </CardBody>
      </Card>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'Body',
    },
  },
  title: 'Common/Pills',
};

export { AsLink, Dropdown };
export default config;
