import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Badge from '../../../components/badge';

const getBadgeColor = (status) => {
  if (status === 'SUCCESSFUL') {
    return {
      bg: COLORS.ACCENT.FRUIT_SALAD_500,
      text: 'white',
    };
  }

  if (status === 'FAILED') {
    return { bg: COLORS.ACCENT.POMEGRANATE_500, text: 'white' };
  }

  return { bg: COLORS.ACCENT.ANZAC_500, text: COLORS.ACCENT.ANZAC_1000 };
};

const FillStatusBadge = styled(Badge).attrs((props) => ({
  bgColor: getBadgeColor(props.children).bg,
  textColor: getBadgeColor(props.children).text,
}))``;

export default FillStatusBadge;
