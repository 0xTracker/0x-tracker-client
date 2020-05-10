import { LightningBolt as ActiveIcon } from 'styled-icons/heroicons-solid';
import { CalendarCheck as ScheduledIcon } from 'styled-icons/boxicons-solid';
import PropTypes from 'prop-types';
import React from 'react';

import { DATE_FORMAT } from '../../../constants';
import { formatDate } from '../../../util';
import { COLORS } from '../../../styles/constants';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import CardHeader from '../../../components/card-header';
import CardHeading from '../../../components/card-heading';

const formatSlotDate = (date) =>
  formatDate(date, DATE_FORMAT.COMPACT, { timezone: false });

const AdSlotsCard = ({ adSlots, onSlotSelected, selectedSlot }) => (
  <Card>
    <CardHeader>
      <CardHeading>Your Ad Slots</CardHeading>
    </CardHeader>
    <CardBody padded>
      <p>
        The following ad slots belong to the connected Ethereum wallet. Select a
        slot to manage it.
      </p>
      <ul
        css={`
          margin: 0;
          padding: 0;
        `}
      >
        {adSlots.map((adSlot) => (
          <li
            css={`
              list-style-type: none;
              margin: 0 0 16px 0;
              padding: 0;
              width: 100%;

              &:last-child {
                margin-bottom: 0;
              }
            `}
            key={adSlot.tokenId}
          >
            <button
              css={`
                align-items: center;
                background: ${COLORS.NEUTRAL.MYSTIC_100};
                border: none;
                border-radius: 4px;
                color: ${(props) =>
                  // eslint-disable-next-line react/prop-types
                  props.selected ? 'inherit' : COLORS.NEUTRAL.MYSTIC_700};
                display: flex;
                list-style-type: none;
                padding: 16px;
                text-align: left;
                width: 100%;

                &:focus {
                  outline: none;
                }
              `}
              onClick={() => {
                onSlotSelected(adSlot);
              }}
              selected={adSlot === selectedSlot}
              type="submit"
            >
              {Date.now() >= adSlot.slotStartTime &&
                Date.now() <= adSlot.slotEndTime && (
                  <ActiveIcon css="margin-right: 8px;" height={20} width={20} />
                )}
              {Date.now() < adSlot.slotStartTime && (
                <ScheduledIcon
                  css="margin-right: 8px;"
                  height={20}
                  width={20}
                />
              )}
              {formatSlotDate(adSlot.slotStartTime)} to{' '}
              {formatSlotDate(adSlot.slotEndTime)}
            </button>
          </li>
        ))}
      </ul>
    </CardBody>
  </Card>
);

AdSlotsCard.propTypes = {
  adSlots: PropTypes.array.isRequired,
  onSlotSelected: PropTypes.func.isRequired,
  selectedSlot: PropTypes.object.isRequired,
};

export default AdSlotsCard;
