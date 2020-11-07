import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import Dialog from '../../../components/dialog';
import SideBannerView from './side-banner-view';

const PlacementHeading = styled.h2`
  border-bottom: 2px solid ${COLORS.NEUTRAL.MYSTIC_300};
  border-radius: 1px;
  font-size: 16px;
  margin: 0 0 16px;
  padding: 0 0 8px;
`;

const AdContentPreview = ({ content, onClose }) => (
  <Dialog height={450} onClose={onClose} title="Advert Preview" width={1024}>
    <PlacementHeading>Side Placement</PlacementHeading>
    <SideBannerView advert={content} css="width: 450px;" />
  </Dialog>
);

AdContentPreview.propTypes = {
  content: PropTypes.shape({
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdContentPreview;
