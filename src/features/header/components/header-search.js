import { useClickAway } from 'react-use';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { SearchIcon } from '../../../components/icons';
import SearchForm from '../../search/components/search-form';
import useEscapeKey from '../../../hooks/use-escape-key';

const SearchInput = styled.input`
  && {
    border: none;
    border-radius: 0.25rem;
    background-color: ${COLORS.NEUTRAL.MYSTIC_200};
    color: ${COLORS.PRIMARY.SCAMPI_800};
    height: 100%;
    outline: none;
    padding: 0.5rem 0.75rem;
    width: 300px;

    ::placeholder {
      color: ${COLORS.NEUTRAL.MYSTIC_800};
    }
  }
`;

const SearchButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 0.25rem;
  color: currentColor;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 0 0.75rem;

  &:hover {
    background: white;
    color: ${COLORS.PRIMARY.SCAMPI_1000};
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
    border-left: 0.5rem solid ${COLORS.NEUTRAL.MYSTIC_200};
    content: '';
    display: inline-block;
  }
`;

const HeaderSearch = ({ onBlur, onSearch }) => {
  const wrapperRef = useRef();

  useClickAway(wrapperRef, onBlur);
  useEscapeKey(onBlur);

  return (
    <div css="display: flex; flex-wrap: nowrap;" ref={wrapperRef}>
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
