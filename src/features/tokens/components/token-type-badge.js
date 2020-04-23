import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';

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

  return { bg: COLORS.NEUTRAL.MYSTIC_300, text: COLORS.NEUTRAL.MYSTIC_1000 };
};

const TokenTypeBadge = styled.span.attrs((props) => ({
  children: props.children.toUpperCase(),
  className: 'badge',
}))`
  background-color: ${(props) => getTypeBadgeColor(props.children).bg};
  color: ${(props) => getTypeBadgeColor(props.children).text};
  margin-left: 0.75rem;
`;

export default TokenTypeBadge;
