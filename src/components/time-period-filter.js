import styled from 'styled-components';

import { colors } from '../styles/constants';
import TimePeriodSelector from './time-period-selector';

const TimePeriodFilter = styled(TimePeriodSelector)`
  && {
    width: 200px;
  }

  && .Select__control {
    background: ${colors.mystic};
    border: none;
    padding: 0.5rem 1rem;

    &:hover {
      background: ${colors.mischka};
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
