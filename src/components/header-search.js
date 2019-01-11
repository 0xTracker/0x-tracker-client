import { useOutsideClick } from 'react-use';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import SearchForm from '../features/search/components/search-form';
import SearchIcon from './search-icon';
import useEscapeKey from '../hooks/use-escape-key';

const SearchInput = styled.input`
  && {
    border: none;
    border-radius: 0.25rem;
    background-color: ${colors.athensGray};
    color: currentColor;
    height: 100%;
    outline: none;
    padding: 0 0.75rem;
    width: 300px;

    ::placeholder {
      color: ${rgba(colors.violet, 0.6)};
    }
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
    border-left: 0.5rem solid ${colors.athensGray};
    content: '';
    display: inline-block;
  }
`;

const HeaderSearch = ({ onBlur, onSearch }) => {
  const wrapperRef = useRef();

  useOutsideClick(wrapperRef, onBlur);
  useEscapeKey(onBlur);

  return (
    <div css="display: flex; flex-wrap: nowrap; height: 100%;" ref={wrapperRef}>
      <SearchForm onSearch={onSearch}>
        {({ currentValue, handleChange, handleSubmit }) => (
          <>
            <SearchInputWrapper>
              <SearchInput
                aria-label="Search Fills"
                autoFocus
                onChange={handleChange}
                placeholder="Search Fills"
                required
                type="search"
                value={currentValue}
              />
            </SearchInputWrapper>
            <SearchButton onClick={handleSubmit} title="Search" type="submit">
              <SearchIcon height={22} width={22} />
            </SearchButton>
          </>
        )}
      </SearchForm>
    </div>
  );
};

HeaderSearch.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default HeaderSearch;
