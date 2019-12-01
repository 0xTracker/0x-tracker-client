import styled from 'styled-components';

import { colors } from '../styles/constants';
import TimePeriodSelector from './time-period-selector';

const TimePeriodFilter = styled(TimePeriodSelector)`
  && {
    width: 180px;
  }

  && .Select__control {
    background: ${colors.athensGrayer};
    border: none;
    padding: 0;

    &:hover {
      background: ${colors.mystic};
    }
  }

  .Select__single-value {
    color: ${colors.violet};
    font-weight: 500;
  }

  && .Select__indicator {
    color: ${colors.violet};
  }
`;
export default TimePeriodFilter;
