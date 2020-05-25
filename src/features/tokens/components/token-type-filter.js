import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import TokenTypeSelector from './token-type-selector';

const TokenTypeFilter = styled(TokenTypeSelector)`
  && {
    width: 200px;
  }

  && .Select__control {
    background: ${COLORS.NEUTRAL.MYSTIC_100};
    border: none;
    box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.2);
    padding: 0.5rem 1rem;

    &:hover {
      box-shadow: 0px 1px 3px rgba(126, 142, 177, 0.4);
    }
  }

  .Select__single-value {
    color: ${COLORS.PRIMARY.SCAMPI_900};
  }

  && .Select__indicator {
    color: ${COLORS.PRIMARY.SCAMPI_900};
  }
`;
export default TokenTypeFilter;
