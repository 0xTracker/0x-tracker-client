import _ from 'lodash';
import { useEffect } from 'react';
import { useTitle } from 'react-use';

const defaults = {
  description:
    'The leading provider of 0x protocol market data, transparent Ethereum token price index and 0x protocol news aggregator.',
  ogDescription:
    'The leading provider of 0x protocol market data, transparent Ethereum token price index and 0x protocol news aggregator.',
  ogTitle: '0x Tracker',
  ogType: 'website',
  title: '0x Tracker',
};

const useMetaTag = (name, value) => {
  useEffect(() => {
    const metaTag = Array.from(document.getElementsByTagName('meta')).find(
      (tag) =>
        tag.getAttribute('property') === name ||
        tag.getAttribute('name') === name,
    );

    if (metaTag !== undefined) {
      metaTag.setAttribute('content', value);
    }
  }, [name, value]);
};

const useMetadata = (metadata) => {
  const title =
    metadata.title === undefined
      ? defaults.title
      : `${metadata.title} | 0x Tracker`;

  const og = _.get(metadata, 'openGraph', {});
  const ogDescription = _.get(og, 'description', defaults.ogDescription);
  const ogTitle = _.get(og, 'title', defaults.ogTitle);
  const description = _.get(metadata, 'description', defaults.description);
  const ogType = _.get(og, 'type', defaults.ogType);

  useTitle(title);
  useMetaTag('og:title', ogTitle);
  useMetaTag('og:type', ogType);
  useMetaTag('og:description', _.truncate(ogDescription, { length: 150 }));
  useMetaTag('description', _.truncate(description, { length: 150 }));
};

export default useMetadata;
