import { storiesOf } from '@storybook/react';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import TradersFilter from './traders-filter';
import PageLayout from '../../../components/page-layout';
import { TRADER_TYPE } from '../constants';

const simpleProps = {
  defaultFilters: {
    statsPeriod: TIME_PERIOD.DAY,
  },
  onChange: (newValues) => {
    console.log('new values', newValues);
  },
  selectedFilters: {
    statsPeriod: TIME_PERIOD.DAY,
  },
};

storiesOf('Traders|TradersFilter', module)
  .add('default', () => <TradersFilter {...simpleProps} />)
  .add('with trader type selected', () => (
    <TradersFilter
      {...simpleProps}
      selectedFilters={{
        statsPeriod: TIME_PERIOD.MONTH,
        type: TRADER_TYPE.MAKER,
      }}
    />
  ))
  .add('in page layout', () => (
    <PageLayout
      actions={<TradersFilter {...simpleProps} />}
      title="Hello World"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas
        ligula id nisi fringilla, at feugiat sapien scelerisque. Nulla facilisi.
        Nunc vel lorem sed orci volutpat commodo. Duis congue est eget dui
        venenatis dictum. Curabitur vestibulum consequat augue, eget porttitor
        justo eleifend ut. Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Curabitur commodo faucibus
        iaculis. Aliquam blandit nunc id nibh pharetra lobortis. Sed porttitor
        id enim quis semper. Mauris consequat lectus at sapien consequat, ut
        feugiat urna imperdiet. Aliquam congue venenatis elit, quis congue
        mauris hendrerit eu. Nunc in congue diam. In nunc velit, tempus et felis
        ornare, blandit imperdiet felis. Integer sapien nisl, tempus nec magna
        eget, congue tempus augue. Ut eu scelerisque nunc. Phasellus molestie
        elit et ipsum gravida, quis blandit eros bibendum. Praesent interdum
        risus eu velit dignissim, congue ullamcorper lectus dapibus. Vestibulum
        et venenatis enim, vel imperdiet nibh. Nulla tristique vehicula
        accumsan. Vivamus id ex eu ante hendrerit porta. Mauris sapien urna,
        vulputate quis placerat quis, accumsan a turpis. Donec vestibulum tellus
        at nunc elementum posuere. Quisque pretium purus a mattis sagittis.
        Vestibulum sem lorem, porta at est eu, scelerisque laoreet nisl.
        Maecenas et ipsum venenatis, congue urna ac, pulvinar massa. Vestibulum
        nec urna in felis ultricies mattis. Nunc in imperdiet lectus. Nulla a
        scelerisque lorem. Aenean faucibus, sem vitae rhoncus dictum, lorem nibh
        sagittis ante, nec laoreet sapien nisl non justo. Nam placerat elit sed
        bibendum porttitor. Nam eget velit tincidunt, pulvinar lectus ac,
        feugiat nibh. In rhoncus, augue sed tristique placerat, felis dui
        convallis enim, at interdum lectus sapien id lorem. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc
        mi risus, dictum non lacus nec, cursus commodo felis. In hac habitasse
        platea dictumst. Proin et malesuada augue. Maecenas suscipit leo et
        ligula vestibulum, vel congue libero tempor. Sed at urna hendrerit,
        convallis turpis quis, viverra lectus.
      </p>
    </PageLayout>
  ));
