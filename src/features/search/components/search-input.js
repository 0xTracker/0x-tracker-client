import _ from 'lodash';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { media } from '../../../styles/util';
import { useCurrentBreakpoint } from '../../../responsive-utils';
import buildAppUrl from '../../apps/util/build-app-url';
import buildTokenUrl from '../../tokens/util/build-token-url';
import buildTraderUrl from '../../traders/util/build-trader-url';
import SearchSuggestion from './search-suggestion';
import useEscapeKey from '../../../hooks/use-escape-key';
import useAutocomplete from '../hooks/use-autocomplete';
import useNavigator from '../../../hooks/use-navigator';

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
    height: 100%;
    outline: none;
    padding: 0;
    text-overflow: ellipsis;
    width: 100%;

    &::placeholder {
      color: ${COLORS.NEUTRAL.MYSTIC_800};
    }
  }

  .react-autosuggest__suggestions-container {
    background: white;
    border-radius: 4px;
    box-shadow: 0 3px 3px rgba(126, 142, 177, 0.2);
    display: block;
    left: 0;
    position: absolute;
    margin: 16px 0 0;
    z-index: 100;
    width: 100%;
    overflow-y: auto;
    max-height: 135px;
    -webkit-overflow-scrolling: touch;

    ${media.greaterThan('sm')`
      max-height: 420px;
    `}
  }

  .react-autosuggest__suggestions-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 12px 16px;
  }

  .react-autosuggest__suggestion--highlighted {
    background: ${COLORS.NEUTRAL.MYSTIC_200};
  }

  .react-autosuggest__section-title {
    background: ${COLORS.NEUTRAL.MYSTIC_100};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: ${COLORS.NEUTRAL.MYSTIC_800};
    font-weight: 500;
    padding: 12px 16px;
  }
`;

function getSuggestionValue(suggestion) {
  if (suggestion === undefined) {
    return '';
  }

  if (suggestion.type === 'token') {
    return suggestion.name || 'Unknown Token';
  }

  if (suggestion.type === 'trader') {
    return suggestion.name || 'Unknown Trader';
  }

  return suggestion.name;
}

function getSectionSuggestions(section) {
  return section.suggestions;
}

const SearchInput = React.forwardRef(
  ({ autoFocus, name, onBlur, onFocus }, ref) => {
    const { navigateTo } = useNavigator();
    const [inputValue, setInputValue] = React.useState('');
    const [suggestions, setSearchTerm] = useAutocomplete();
    const breakpoint = useCurrentBreakpoint();

    useEscapeKey(() => {
      ref.current.blur();
    });

    return (
      <InputWrapper>
        <Autosuggest
          alwaysRenderSuggestions
          focusInputOnSuggestionClick={false}
          getSectionSuggestions={getSectionSuggestions}
          getSuggestionValue={getSuggestionValue}
          highlightFirstSuggestion
          inputProps={{
            autoFocus,
            name,
            onBlur: () => {
              onBlur();
            },
            onChange: (e, { newValue }) => {
              setInputValue(newValue);
            },
            onFocus: () => {
              onFocus();
            },
            placeholder: breakpoint.greaterThan('xs')
              ? 'Search for tokens, apps, traders or trades'
              : 'Search site...',
            ref,
            value: inputValue,
          }}
          multiSection
          onSuggestionSelected={(event, { suggestion }) => {
            event.preventDefault();

            if (suggestion.type === 'token') {
              if (window.fathom) {
                window.fathom.trackGoal('ZDZEDJID', 0);
              }

              navigateTo(buildTokenUrl(suggestion.address), undefined, {
                clientSide: false,
              });
            }

            if (suggestion.type === 'app') {
              if (window.fathom) {
                window.fathom.trackGoal('JUOWT2KW', 0);
              }

              navigateTo(buildAppUrl(suggestion.urlSlug), undefined, {
                clientSide: false,
              });
            }

            if (suggestion.type === 'trader') {
              if (window.fathom) {
                window.fathom.trackGoal('97XS1YIG', 0);
              }

              navigateTo(buildTraderUrl(suggestion.address), undefined, {
                clientSide: false,
              });
            }
          }}
          onSuggestionsClearRequested={() => {
            setSearchTerm(null);
          }}
          onSuggestionsFetchRequested={({ value, reason }) => {
            if (reason === 'input-changed' || reason === 'input-focused') {
              setSearchTerm(value);
            }
          }}
          renderSectionTitle={(section) =>
            inputValue === '' ? `Suggested ${section.title}` : section.title
          }
          renderSuggestion={(suggestion) => (
            <SearchSuggestion suggestion={suggestion} />
          )}
          shouldRenderSuggestions={(value) => {
            if (!_.isString(value)) {
              return false;
            }

            return value.trim().length >= 3;
          }}
          suggestions={suggestions}
        />
      </InputWrapper>
    );
  },
);

SearchInput.displayName = 'SearchInput';

SearchInput.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default SearchInput;
