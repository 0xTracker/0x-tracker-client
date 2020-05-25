import { useClickAway } from 'react-use';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { TimePeriodIcon } from './icons';
import PopoutTimePeriodSelector from './popout-time-period-selector';
import sharedPropTypes from '../prop-types';

const Button = styled.button`
  align-items: center;
  background: ${COLORS.NEUTRAL.MYSTIC_100};
  border: none;
  box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
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

  &:hover,
  &:active {
    box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.4);
  }
`;

const MobileTimePeriodFilter = ({ className, onChange, value }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef();

  useClickAway(wrapperRef, () => {
    setOpen(false);
  });

  return (
    <div className={className} ref={wrapperRef}>
      <Button onClick={() => setOpen(!open)}>
        <TimePeriodIcon height={22} width={22} />
      </Button>
      {open && (
        <PopoutTimePeriodSelector
          onChange={(newValue) => {
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
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: sharedPropTypes.timePeriod.isRequired,
};

MobileTimePeriodFilter.defaultProps = {
  className: undefined,
};

export default MobileTimePeriodFilter;
