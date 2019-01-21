import { storiesOf } from '@storybook/react';
import React from 'react';

import NewsArticle from './article';

const simpleArticle = {
  id: '123',
  date: new Date('2018-02-24'),
  source: { name: '0x Project', url: 'https://0xproject.com' },
  title: 'Hello World',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non mollis nibh. Vestibulum non lorem vel nibh sodales sagittis sed at tortor.',
  url: 'https://0xproject.com',
};

storiesOf('News|Article', module)
  .add('default', () => <NewsArticle article={simpleArticle} />)
  .add('without linked source', () => (
    <NewsArticle
      article={{
        ...simpleArticle,
        source: { ...simpleArticle.source, url: undefined },
      }}
    />
  ))
  .add('with long summary', () => (
    <NewsArticle
      article={{
        ...simpleArticle,
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non mollis nibh. Vestibulum non lorem vel nibh sodales sagittis sed at tortor. Aliquam erat volutpat. Aliquam luctus pulvinar ornare. Vestibulum interdum volutpat sapien id cursus. Nulla ornare leo fermentum arcu varius, eget scelerisque tellus ultricies. Maecenas eget volutpat lectus. In faucibus pretium sapien a varius. Morbi orci eros, feugiat gravida sagittis in, condimentum sed ante. Aliquam sem felis, aliquam sit amet purus et, vestibulum mollis mauris.',
      }}
    />
  ));
