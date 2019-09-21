import ReactSelect from 'react-select';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const Select = styled(ReactSelect).attrs({ classNamePrefix: 'Select' })`
  color: ${colors.violet};

  .Select__control {
    border-color: ${colors.mischka};
  }

  .Select__control--is-focused {
    box-shadow: none;
  }

  .Select__dropdown-indicator {
    color: ${colors.stormGray};
  }

  .Select__indicator-separator {
    background-color: ${colors.mischka};
  }

  .Select__option:hover,
  .Select__option:active,
  .Select__option--is-focused {
    background: ${colors.mischka};
    color: ${colors.violet};
    cursor: pointer;
  }

  .Select__option--is-selected {
    background: ${colors.athensGray};
    color: ${colors.violet};
  }

  &:hover {
    .Select__control {
      border-color: ${colors.santasGray};
    }
  }
`;

export default Select;
