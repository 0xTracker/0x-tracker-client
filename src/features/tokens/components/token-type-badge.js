import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Badge from '../../../components/badge';

const getTypeBadgeColor = (type) => {
  if (type === 'ERC-721') {
    return {
      bg: COLORS.ACCENT.FRUIT_SALAD_300,
      text: COLORS.ACCENT.FRUIT_SALAD_1000,
    };
  }

  if (type === 'ERC-1155') {
    return { bg: COLORS.PRIMARY.SCAMPI_600, text: 'white' };
  }

  return { bg: COLORS.NEUTRAL.MYSTIC_400, text: COLORS.NEUTRAL.MYSTIC_900 };
};

const TokenTypeBadge = styled(Badge).attrs((props) => ({
  bgColor: getTypeBadgeColor(props.children).bg,
  children: props.children.toUpperCase(),
  className: 'badge',
  textColor: getTypeBadgeColor(props.children).text,
}))`
  margin-left: 0.75rem;
`;

export default TokenTypeBadge;
