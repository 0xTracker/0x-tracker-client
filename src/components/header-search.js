import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import SearchForm from '../features/search/components/search-form';
import SearchIcon from './search-icon';

const SearchInput = styled.input`
  && {
    border: none;
    border-radius: 0.25rem;
    background-color: ${colors.martinique};
    color: ${colors.white};
    height: 100%;
    padding: 0 0.75rem;
  }
`;

const SearchButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 0 0.75rem;

  &:hover {
    background: ${colors.athensGray};
  }
`;

const SearchInputWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  height: 100%;
  margin-right: 0.5rem;

  &::after {
    flex-grow: 0;
    width: 0;
    height: 0;
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    border-left: 0.5rem solid ${colors.martinique};
    content: '';
    display: inline-block;
  }
`;

const HeaderSearch = ({ onBlur, onSearch }) => {
  let blurTimeout;

  return (
    <SearchForm
      css="display: flex; flex-wrap: nowrap; height: 100%;"
      onSearch={onSearch}
    >
      {({ currentValue, handleChange, handleSubmit }) => (
        <React.Fragment>
          <SearchInputWrapper>
            <SearchInput
              aria-label="Search Fills"
              autoFocus
              onBlur={() => {
                blurTimeout = setTimeout(() => {
                  onBlur();
                }, 100);
              }}
              onChange={handleChange}
              placeholder="Search Fills"
              required
              type="search"
              value={currentValue}
            />
          </SearchInputWrapper>
          <SearchButton
            onClick={event => {
              clearTimeout(blurTimeout);
              handleSubmit(event);
            }}
            title="Search"
            type="submit"
          >
            <SearchIcon height={22} width={22} />
          </SearchButton>
        </React.Fragment>
      )}
    </SearchForm>
  );
};

HeaderSearch.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default HeaderSearch;
