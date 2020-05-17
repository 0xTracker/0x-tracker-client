import React from 'react';

import AdManagerPageLayout from './ad-manager-page-layout';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';
import CardPlaceholder from '../../../components/card-placeholder';

const NoAdSlots = () => (
  <AdManagerPageLayout>
    <CardGrid>
      <CardGridRow>
        <CardGridCol>
          <Card>
            <CardBody padded>
              <CardPlaceholder>
                No ad slots were found belonging to this wallet.
              </CardPlaceholder>
            </CardBody>
          </Card>
        </CardGridCol>
      </CardGridRow>
    </CardGrid>
  </AdManagerPageLayout>
);

export default NoAdSlots;
