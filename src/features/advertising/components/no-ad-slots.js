import React from 'react';

import AdManagerPageLayout from './ad-manager-page-layout';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';

const NoAdSlots = () => (
  <AdManagerPageLayout>
    <CardGrid>
      <CardGridRow>
        <CardGridCol>
          <Card>
            <CardBody padded>
              No ad slots belong to the connected wallet.
            </CardBody>
          </Card>
        </CardGridCol>
      </CardGridRow>
    </CardGrid>
  </AdManagerPageLayout>
);

export default NoAdSlots;
