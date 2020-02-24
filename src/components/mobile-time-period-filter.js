import { useClickAway } from 'react-use';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { TimePeriodIcon } from './icons';
import PopoutTimePeriodSelector from './popout-time-period-selector';
import sharedPropTypes from '../prop-types';

const Button = styled.button`
  align-items: center;
  background: ${colors.mystic};
  border: none;
  border-radius: 0.25rem;
  color: currentColor;
  display: flex;
  height: 38px;
  width: 38px;
  flex-shrink: 0;
  flex-grow: 0;
  justify-content: center;
  padding: 0;
  position: relative;

  &:hover {
    background: ${colors.mischka};
  }
`;

const MobileTimePeriodFilter = ({ onChange, value }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();

  useClickAway(wrapperRef, () => {
    setOpen(false);
  });

  return (
    <div ref={wrapperRef}>
      <Button onClick={() => setOpen(!open)}>
        <TimePeriodIcon height={22} width={22} />
      </Button>
      {open && (
        <PopoutTimePeriodSelector
          onChange={newValue => {
            onChange(newValue);
            setOpen(false);
          }}
          value={value}
        />
      )}
    </div>
  );
};

MobileTimePeriodFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: sharedPropTypes.timePeriod.isRequired,
};

export default MobileTimePeriodFilter;
