import { useLockBodyScroll } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { SearchIcon } from '../../../components/icons';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import SearchInput from './search-input';
import useEscapeKey from '../../../hooks/use-escape-key';

const SearchOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'visible',
})`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  background: hsla(235, 12%, 22%, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
`;

const SearchIconWrapper = styled.div`
  background-color: ${COLORS.NEUTRAL.MYSTIC_100};
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  color: ${COLORS.NEUTRAL.MYSTIC_400};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

const SearchButton = styled.button`
  background: ${COLORS.ACCENT.ANZAC_500};
  border: none;
  border-radius: 4px;
  color: ${COLORS.ACCENT.ANZAC_1000};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin: 8px;
  padding: 4px 16px;
  text-transform: uppercase;
`;

const SearchBox = ({ autoFocus, onBlur }) => {
  const [focused, setFocused] = React.useState(autoFocus);

  useLockBodyScroll(focused);
  useEscapeKey(onBlur);

  return (
    <>
      <SearchOverlay visible={focused} />
      <Card css=" position: relative; z-index: 6;">
        <CardBody css="flex-direction: row;">
          <SearchIconWrapper>
            <SearchIcon size={20} />
          </SearchIconWrapper>
          <SearchInput
            autoFocus={autoFocus}
            onBlur={() => {
              setFocused(false);
              onBlur();
            }}
            onFocus={() => {
              setFocused(true);
            }}
          />
          <SearchButton type="submit">Search</SearchButton>
        </CardBody>
      </Card>
    </>
  );
};

SearchBox.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default SearchBox;
