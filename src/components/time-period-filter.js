import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import TimePeriodSelector from './time-period-selector';

const TimePeriodFilter = styled(TimePeriodSelector)`
  && {
    width: 200px;
  }

  && .Select__control {
    background: ${COLORS.NEUTRAL.MYSTIC_300};
    border: none;
    padding: 0.5rem 1rem;

    &:hover {
      background: ${COLORS.NEUTRAL.MYSTIC_400};
    }
  }

  .Select__single-value {
    color: ${COLORS.NEUTRAL.MYSTIC_1000};
    font-weight: 500;
  }

  && .Select__indicator {
    color: ${COLORS.NEUTRAL.MYSTIC_1000};
  }
`;
export default TimePeriodFilter;
