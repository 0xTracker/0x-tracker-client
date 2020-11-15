import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const ColorBox = ({ color, name }) => (
  <div css="display: inline-block; margin: 0 5px 25px 0;">
    <div
      css={`
        background-color: ${color};
        border-radius: 4px;
        height: 60px;
        width: 110px;
      `}
    />
    <span css="display: block; font-size: 9px; letter-spacing: 0.05em; font-weight: 600; margin: 4px 0 0;">
      {name}
    </span>
    <span css="display: block; font-size: 10px">{color}</span>
  </div>
);

const GroupHeading = styled.h2`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px 0;
`;

storiesOf('Common/Colors', module).add('Default', () => (
  <div css="padding: 15px 25px;">
    <h1 css="font-size: 24px; margin: 0 0 8px">Color Palette 🎨</h1>
    <p css="width: 45em; margin: 0 0 36px">
      All colors used in components should be derived from the following color
      palette. Primary and gray colors should predominantly be chosen, with
      accent colors used for highlighting.
    </p>
    <GroupHeading>Neutral</GroupHeading>
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_100} name="MYSTIC_100" />
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_200} name="MYSTIC_200" />
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_300} name="MYSTIC_300" />
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_400} name="MYSTIC_400" />
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_500} name="MYSTIC_500" />
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_600} name="MYSTIC_600" />
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_700} name="MYSTIC_700" />
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_800} name="MYSTIC_800" />
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_900} name="MYSTIC_900" />
    <ColorBox color={COLORS.NEUTRAL.MYSTIC_1000} name="MYSTIC_1000" />

    <GroupHeading>Primary</GroupHeading>
    <ColorBox color={COLORS.PRIMARY.SCAMPI_100} name="SCAMPI_100" />
    <ColorBox color={COLORS.PRIMARY.SCAMPI_200} name="SCAMPI_200" />
    <ColorBox color={COLORS.PRIMARY.SCAMPI_300} name="SCAMPI_300" />
    <ColorBox color={COLORS.PRIMARY.SCAMPI_400} name="SCAMPI_400" />
    <ColorBox color={COLORS.PRIMARY.SCAMPI_500} name="SCAMPI_500" />
    <ColorBox color={COLORS.PRIMARY.SCAMPI_600} name="SCAMPI_600" />
    <ColorBox color={COLORS.PRIMARY.SCAMPI_700} name="SCAMPI_700" />
    <ColorBox color={COLORS.PRIMARY.SCAMPI_800} name="SCAMPI_800" />
    <ColorBox color={COLORS.PRIMARY.SCAMPI_900} name="SCAMPI_900" />
    <ColorBox color={COLORS.PRIMARY.SCAMPI_1000} name="SCAMPI_1000" />

    <GroupHeading>Accent #1</GroupHeading>
    <ColorBox color={COLORS.ACCENT.ANZAC_100} name="ANZAC_100" />
    <ColorBox color={COLORS.ACCENT.ANZAC_200} name="ANZAC_200" />
    <ColorBox color={COLORS.ACCENT.ANZAC_300} name="ANZAC_300" />
    <ColorBox color={COLORS.ACCENT.ANZAC_400} name="ANZAC_400" />
    <ColorBox color={COLORS.ACCENT.ANZAC_500} name="ANZAC_500" />
    <ColorBox color={COLORS.ACCENT.ANZAC_600} name="ANZAC_600" />
    <ColorBox color={COLORS.ACCENT.ANZAC_700} name="ANZAC_700" />
    <ColorBox color={COLORS.ACCENT.ANZAC_800} name="ANZAC_800" />
    <ColorBox color={COLORS.ACCENT.ANZAC_900} name="ANZAC_900" />
    <ColorBox color={COLORS.ACCENT.ANZAC_1000} name="ANZAC_1000" />

    <GroupHeading>Accent #2</GroupHeading>
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_100} name="FRUIT_SALAD_100" />
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_200} name="FRUIT_SALAD_200" />
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_300} name="FRUIT_SALAD_300" />
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_400} name="FRUIT_SALAD_400" />
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_500} name="FRUIT_SALAD_500" />
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_600} name="FRUIT_SALAD_600" />
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_700} name="FRUIT_SALAD_700" />
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_800} name="FRUIT_SALAD_800" />
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_900} name="FRUIT_SALAD_900" />
    <ColorBox color={COLORS.ACCENT.FRUIT_SALAD_1000} name="FRUIT_SALAD_1000" />

    <GroupHeading>Accent #3</GroupHeading>
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_100} name="POMEGRANATE_100" />
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_200} name="POMEGRANATE_200" />
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_300} name="POMEGRANATE_300" />
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_400} name="POMEGRANATE_400" />
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_500} name="POMEGRANATE_500" />
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_600} name="POMEGRANATE_600" />
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_700} name="POMEGRANATE_700" />
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_800} name="POMEGRANATE_800" />
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_900} name="POMEGRANATE_900" />
    <ColorBox color={COLORS.ACCENT.POMEGRANATE_1000} name="POMEGRANATE_1000" />
  </div>
));
