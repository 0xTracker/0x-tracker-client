import { storiesOf } from '@storybook/react';
import React from 'react';

import PageLayout from './page-layout';

const simpleProps = {
  title: 'DAI Stablecoin',
};

storiesOf('Layout|PageLayout', module).add('default', () => (
  <PageLayout {...simpleProps}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Varius vel pharetra
      vel turpis nunc eget lorem. Nisl vel pretium lectus quam id leo in.
      Adipiscing elit ut aliquam purus sit. Amet tellus cras adipiscing enim eu
      turpis egestas pretium aenean. Eros donec ac odio tempor orci dapibus
      ultrices in iaculis. A diam sollicitudin tempor id. Sem fringilla ut morbi
      tincidunt augue interdum. Tortor consequat id porta nibh. Mauris sit amet
      massa vitae tortor. Facilisi nullam vehicula ipsum a arcu cursus vitae.
      Accumsan tortor posuere ac ut consequat semper viverra nam. Dignissim cras
      tincidunt lobortis feugiat vivamus. Nunc scelerisque viverra mauris in
      aliquam sem fringilla ut. Nisl vel pretium lectus quam. Vitae tempus quam
      pellentesque nec nam aliquam sem et. Aliquet enim tortor at auctor urna
      nunc. A arcu cursus vitae congue. Fringilla urna porttitor rhoncus dolor
      purus. Et leo duis ut diam.
    </p>
    <p>
      Dolor magna eget est lorem ipsum dolor sit amet consectetur. Consectetur
      adipiscing elit duis tristique. Pellentesque elit ullamcorper dignissim
      cras tincidunt lobortis. Urna neque viverra justo nec ultrices dui sapien.
      Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. Est
      placerat in egestas erat imperdiet sed euismod. Sed nisi lacus sed viverra
      tellus in. Quis commodo odio aenean sed. Id consectetur purus ut faucibus.
      Euismod elementum nisi quis eleifend quam adipiscing vitae proin. Viverra
      ipsum nunc aliquet bibendum enim facilisis gravida neque. Nisi quis
      eleifend quam adipiscing vitae proin sagittis nisl. Morbi tempus iaculis
      urna id volutpat lacus laoreet. Lacinia at quis risus sed vulputate odio
      ut. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada
      proin.
    </p>
    <p>
      At imperdiet dui accumsan sit amet nulla facilisi. Suscipit tellus mauris
      a diam maecenas sed enim. Amet consectetur adipiscing elit pellentesque
      habitant morbi tristique senectus et. Consequat mauris nunc congue nisi.
      Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Massa
      tincidunt dui ut ornare lectus sit amet est. Luctus accumsan tortor
      posuere ac. Cras sed felis eget velit aliquet. Vulputate ut pharetra sit
      amet. Pulvinar neque laoreet suspendisse interdum consectetur libero id.
      Amet risus nullam eget felis. Proin sagittis nisl rhoncus mattis rhoncus.
      Et netus et malesuada fames. Tortor vitae purus faucibus ornare. Blandit
      aliquam etiam erat velit scelerisque in dictum non. Praesent tristique
      magna sit amet. Viverra nam libero justo laoreet sit amet. Blandit aliquam
      etiam erat velit scelerisque.
    </p>
  </PageLayout>
));
