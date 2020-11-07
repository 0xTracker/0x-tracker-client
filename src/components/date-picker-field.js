import { format as formatDate, parse as parseDate } from 'date-fns';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';

import 'react-day-picker/lib/style.css';

const Wrapper = styled.div`
  .DayPickerInput {
    width: 100%;
  }

  .DayPickerInput input {
    border: 2px solid ${COLORS.NEUTRAL.MYSTIC_400};
    border-radius: 0.25rem;
    color: inherit;
    padding: 0.5rem 0.7rem;
    width: 100%;

    &:active,
    &:focus {
      border: 2px solid ${COLORS.NEUTRAL.MYSTIC_500};
    }

    &::placeholder {
      color: ${COLORS.NEUTRAL.MYSTIC_500};
      opacity: 1;
    }

    &:invalid {
      border-color: ${COLORS.ACCENT.POMEGRANATE_400};
      box-shadow: none;
    }
  }
`;

const getUTCValueAsLocalDate = (value) => {
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
  format,
  name,
  onChange,
  value,
  ...otherProps
}) => (
  <Wrapper className={className}>
    <DayPickerInput
      dayPickerProps={
        dayPickerProps !== undefined
          ? {
              ...dayPickerProps,
              containerProps: { children: <span>test</span> },
              showOutsideDays: true,
            }
          : { showOutsideDays: true }
      }
      format={format}
      formatDate={(date, fmt, locale) => formatDate(date, fmt, { locale })}
      name={name}
      onDayChange={(newValue) => {
        if (newValue === undefined) {
          onChange(undefined, name);
          return;
        }

        const year = newValue.getFullYear();
        const month = newValue.getMonth();
        const day = newValue.getDate();
        const newDateUTC = new Date();

        if (endOfDay) {
          newDateUTC.setTime(Date.UTC(year, month, day, 23, 59, 59, 999));
        } else {
          newDateUTC.setTime(Date.UTC(year, month, day));
        }

        onChange(newDateUTC.toISOString(), name);
      }}
      parseDate={(str, fmt, locale) => {
        if (str.length < 10) {
          return undefined;
        }

        const parsed = parseDate(str, fmt, new Date(), { locale });

        if (DateUtils.isDate(parsed)) {
          return parsed;
        }

        return undefined;
      }}
      placeholder={format.toUpperCase()}
      value={getUTCValueAsLocalDate(value)}
      {...otherProps}
    />
  </Wrapper>
);

DatePickerField.propTypes = {
  className: PropTypes.string,
  dayPickerProps: PropTypes.object,
  endOfDay: PropTypes.bool,
  format: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

DatePickerField.defaultProps = {
  className: undefined,
  dayPickerProps: undefined,
  endOfDay: false,
  format: 'dd/MM/yyyy',
  value: undefined,
};

export default DatePickerField;
