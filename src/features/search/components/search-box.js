import { useKey, useLockBodyScroll } from 'react-use';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
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
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

const SearchBox = ({ autoFocus, onBlur }) => {
  const [focused, setFocused] = React.useState(autoFocus);
  const inputRef = React.useRef();

  // There are issues with scrolling the results in iOS if body scroll is locked
  useLockBodyScroll(focused && !iOS);

  useEscapeKey(() => {
    inputRef.current.blur();
  });

  useKey('/', (event) => {
    event.preventDefault();
    inputRef.current.focus();
  });

  React.useEffect(() => {
    if (!focused) {
      onBlur();
    }
  }, [focused]);

  return (
    <>
      <SearchOverlay visible={focused} />
      <Card
        css={`
          box-shadow: none;
          color: ${COLORS.PRIMARY.SCAMPI_1000};
          position: relative;
          z-index: 6;
          height: 42px;
        `}
      >
        <CardBody css="height: 36px;">
          <form
            action="/search"
            css="display: flex; flex-grow: 1; padding: 6px 6px 6px 12px;"
            method="get"
          >
            {/* <SearchIconWrapper>
              <SearchIcon size={20} />
            </SearchIconWrapper> */}
            <SearchInput
              autoFocus={autoFocus}
              name="q"
              onBlur={() => {
                setFocused(false);
              }}
              onFocus={() => {
                setFocused(true);
              }}
              ref={inputRef}
            />
            <div
              css={`
                background: ${COLORS.NEUTRAL.MYSTIC_200};
                color: ${COLORS.NEUTRAL.MYSTIC_500};
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 8px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                font-size: 12px;
                font-weight: 500;
                height: 100%;
              `}
            >
              <svg
                css="margin-right: 8px;"
                fill="currentColor"
                focusable="false"
                height="22"
                role="img"
                viewBox="0 0 576 512"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M528 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm8 336c0 4.411-3.589 8-8 8H48c-4.411 0-8-3.589-8-8V112c0-4.411 3.589-8 8-8h480c4.411 0 8 3.589 8 8v288zM170 270v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm-336 82v-28c0-6.627-5.373-12-12-12H82c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm384 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zM122 188v-28c0-6.627-5.373-12-12-12H82c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm96 0v-28c0-6.627-5.373-12-12-12h-28c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h28c6.627 0 12-5.373 12-12zm-98 158v-16c0-6.627-5.373-12-12-12H180c-6.627 0-12 5.373-12 12v16c0 6.627 5.373 12 12 12h216c6.627 0 12-5.373 12-12z"
                  fill="currentColor"
                />
              </svg>
              {focused ? 'esc' : '/'}
            </div>
            {/* <SearchButton type="submit">Search</SearchButton> */}
          </form>
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
