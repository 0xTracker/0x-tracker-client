import DayPickerInput from 'react-day-picker/DayPickerInput';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import dateFnsFormat from 'date-fns/format';

import { COLORS } from '../styles/constants';

import 'react-day-picker/lib/style.css';

const Wrapper = styled.div`
  .DayPickerInput {
    width: 100%;
  }

  .DayPickerInput input {
    border: 2px solid ${COLORS.NEUTRAL.MYSTIC_300};
    border-radius: 0.25rem;
    color: inherit;
    padding: 0.5rem 0.7rem;
    width: 100%;

    &:active,
    &:focus {
      border: 2px solid ${COLORS.NEUTRAL.MYSTIC_400};
    }

    &::placeholder {
      color: ${COLORS.NEUTRAL.MYSTIC_400};
      opacity: 1;
    }

    &:invalid {
      border-color: ${COLORS.ACCENT.POMEGRANATE_400};
      box-shadow: none;
    }
  }
`;

const getValueAsDate = (value) => {
  if (value === undefined) {
    return undefined;
  }

  const utcDate = new Date(value);

  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth();
  const day = utcDate.getUTCDate();

  return new Date(year, month, day);
};

const DatePickerField = ({
  className,
  dayPickerProps,
  endOfDay,
  name,
  onChange,
  value,
  ...otherProps
}) => (
  <Wrapper className={className}>
    <DayPickerInput
      dayPickerProps={
        dayPickerProps !== undefined
          ? { ...dayPickerProps, showOutsideDays: true }
          : { showOutsideDays: true }
      }
      format="MM/dd/yyyy"
      formatDate={function formatDate(date, format, locale) {
        return dateFnsFormat(date, format, { locale });
      }}
      name={name}
      onDayChange={(newValue) => {
        if (newValue === undefined) {
          onChange(undefined, name);
        }

        const year = newValue.getFullYear();
        const month = newValue.getMonth();
        const day = newValue.getDate();
        const newDate = new Date();

        if (endOfDay) {
          newDate.setTime(Date.UTC(year, month, day, 23, 59, 59, 999));
        } else {
          newDate.setTime(Date.UTC(year, month, day));
        }

        onChange(newDate.toISOString(), name);
      }}
      placeholder="DD/MM/YYYY"
      value={getValueAsDate(value)}
      {...otherProps}
    />
  </Wrapper>
);

DatePickerField.propTypes = {
  className: PropTypes.string,
  dayPickerProps: PropTypes.object,
  endOfDay: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

DatePickerField.defaultProps = {
  className: undefined,
  dayPickerProps: undefined,
  endOfDay: false,
  value: undefined,
};

export default DatePickerField;
