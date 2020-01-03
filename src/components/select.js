import ReactSelect from 'react-select';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const Select = styled(ReactSelect).attrs({ classNamePrefix: 'Select' })`
  color: ${colors.violet};

  && .Select__control {
    border-color: ${colors.mystic};
    min-height: 0;
    padding: 0.5rem 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  .Select__value-container {
    padding: 0;
  }

  .Select__control--is-focused {
    box-shadow: none;
  }

  .Select__dropdown-indicator {
    color: ${colors.stormGray};
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__indicator {
    padding: 0;
  }

  .Select__option:hover,
  .Select__option:active,
  .Select__option--is-focused {
    background: ${colors.mystic};
    color: ${colors.violet};
    cursor: pointer;
  }

  .Select__option--is-selected {
    background: ${colors.athensGrayer};
    color: ${colors.violet};
  }

  &:hover {
    .Select__control {
      border-color: ${colors.santasGray};
    }
  }
`;

export default Select;
