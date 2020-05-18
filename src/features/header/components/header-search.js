import { useLockBodyScroll } from 'react-use';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { SearchIcon } from '../../../components/icons';
import Card from '../../../components/card';
import CardBody from '../../../components/card-body';
import useEscapeKey from '../../../hooks/use-escape-key';

const InputWrapper = styled.div`
  display: flex;
  flex-grow: 1;

  .react-autosuggest__container {
    flex-grow: 1;
  }

  .react-autosuggest__input {
    background: none;
    border: none;
    color: inherit;
    flex-grow: 1;
    margin: 12px 16px 12px 16px;
    outline: none;
    width: 100%;

    &::placeholder {
      color: ${COLORS.NEUTRAL.MYSTIC_400};
    }
  }

  .react-autosuggest__suggestions-container {
    background: white;
    border-radius: 4px;
    box-shadow: 0 3px 3px rgba(126, 142, 177, 0.2);
    left: 0;
    position: absolute;
    margin: 8px 0 0;
    z-index: 100;
    width: 100%;
    max-height: 415px;
    overflow: auto;
  }

  .react-autosuggest__suggestions-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .react-autosuggest__suggestion {
    padding: 12px 16px;
  }

  .react-autosuggest__suggestion--highlighted {
    background: ${COLORS.NEUTRAL.MYSTIC_200};
  }

  .react-autosuggest__section-title {
    background: ${COLORS.NEUTRAL.MYSTIC_100};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: ${COLORS.NEUTRAL.MYSTIC_700};
    font-weight: 500;
    padding: 12px 16px;
  }
`;

const values = [
  {
    suggestions: [
      {
        address: 'BAT',
        imageUrl:
          'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0x0d8775f648430679a709e98d2b0cb6250d2887ef.png',
        name: 'Basic Attention Token',
        symbol: 'BAT',
      },
      {
        address: 'ZRX',
        imageUrl: 'https://resources.0xtracker.com/logos/0x.png',
        name: '0x Token',
        symbol: 'ZRX',
      },
      {
        address: 'WETH',
        imageUrl:
          'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        name: 'Wrapped Ether',
        symbol: 'WETH',
      },
      {
        address: 'DAI',
        imageUrl:
          'https://cdn.staticaly.com/gh/TrustWallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
        name: 'DAI Stablecoin',
        symbol: 'DAI',
      },
    ],
    title: 'Tokens',
  },
  {
    suggestions: [
      {
        id: 'emoon',
        imageUrl: 'https://resources.0xtracker.com/logos/emoon.png',
        name: 'Emoon',
      },
      {
        id: 'radarRelay',
        imageUrl: 'https://resources.0xtracker.com/logos/radar-relay.png',
        name: 'Radar Relay',
      },
      {
        id: 'tokenlon',
        imageUrl: 'https://resources.0xtracker.com/logos/tokenlon.png',
        name: 'Tokenlon',
      },
    ],
    title: 'Relayers',
  },
];

function getSuggestionValue(suggestion) {
  return suggestion.address;
}

function getSectionSuggestions(section) {
  return section.suggestions;
}

const HeaderSearch = ({ autoFocus, onBlur }) => {
  const [focused, setFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);

  useLockBodyScroll(focused && searchTerm.length > 0);
  useEscapeKey(onBlur);

  return (
    <>
      <div
        css={`
          display: ${focused && searchTerm.length > 0 ? 'block' : 'none'};
          background: hsla(235, 12%, 22%, 0.4);
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 5;
        `}
      />
      <Card css=" position: relative; z-index: 6;">
        <CardBody>
          <div css="display: flex;">
            <div
              css={`
                background-color: ${COLORS.NEUTRAL.MYSTIC_100};
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
                color: ${COLORS.NEUTRAL.MYSTIC_400};
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 16px;
              `}
            >
              <SearchIcon size={20} />
            </div>
            <InputWrapper>
              <Autosuggest
                getSectionSuggestions={getSectionSuggestions}
                getSuggestionValue={getSuggestionValue}
                inputProps={{
                  autoFocus,
                  onBlur: () => {
                    onBlur();
                  },
                  onChange: (e) => {
                    setSearchTerm(e.currentTarget.value);
                  },
                  placeholder: 'Search for tokens, relayers, traders or fills',
                  value: searchTerm,
                }}
                multiSection
                onSuggestionsClearRequested={() => {
                  setFocused(false);
                  setSuggestions([]);
                }}
                onSuggestionsFetchRequested={() => {
                  setFocused(true);
                  setSuggestions(values);
                }}
                renderSectionTitle={(section) => <span>{section.title}</span>}
                renderSuggestion={(suggestion) => (
                  <div css="align-items: center; display: flex;">
                    <img
                      css="border-radius: 4px; height: 35px; width: 35px; flex: 0; margin-right: 12px;"
                      src={suggestion.imageUrl}
                    />
                    {suggestion.name}
                  </div>
                )}
                suggestions={suggestions}
              />
            </InputWrapper>
            <button
              css={`
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
              `}
              type="submit"
            >
              Search
            </button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

HeaderSearch.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default HeaderSearch;
