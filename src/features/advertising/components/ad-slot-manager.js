import PropTypes from 'prop-types';
import React, { useState } from 'react';

import AdContentManager from './ad-content-manager';
import AdManagerPageLayout from './ad-manager-page-layout';
import AdSlotsCard from './ad-slots-card';
import CardGrid from '../../../components/card-grid';
import CardGridCol from '../../../components/card-grid-col';
import CardGridRow from '../../../components/card-grid-row';

const AdSlotManager = ({ adSlots }) => {
  const [selectedSlot, setSelectedAdSlot] = useState();
  const currentSlot = selectedSlot || adSlots[0];

  return (
    <AdManagerPageLayout>
      <CardGrid>
        <CardGridRow>
          <CardGridCol lg={8}>
            <AdContentManager adSlot={currentSlot} />
          </CardGridCol>
          <CardGridCol lg={4}>
            <AdSlotsCard
              adSlots={adSlots}
              onSlotSelected={(adSlot) => {
                setSelectedAdSlot(adSlot);
              }}
              selectedSlot={currentSlot}
            />
          </CardGridCol>
        </CardGridRow>
      </CardGrid>
    </AdManagerPageLayout>
  );
};

AdSlotManager.propTypes = {
  adSlots: PropTypes.arrayOf(
    PropTypes.shape({
      slotEndTime: PropTypes.instanceOf(Date).isRequired,
      slotStartTime: PropTypes.instanceOf(Date).isRequired,
      tokenId: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default AdSlotManager;
