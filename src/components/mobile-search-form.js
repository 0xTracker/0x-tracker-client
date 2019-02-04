import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { SearchIcon } from './icons';
import SearchForm from '../features/search/components/search-form';

const SearchInput = styled.input`
  && {
    border: none;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    background-color: ${colors.martinique};
    color: ${colors.white};
    height: 2.5rem;
    flex-grow: 1;
    padding: 0 0.75rem;
  }
`;

const SearchButton = styled.button`
  background-color: ${colors.stormGray};
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border: none;
  color: ${colors.violet};
  height: 2.5rem;
  line-height: 1;
  padding: 0 0.75rem;

  &:hover {
    background-color: ${colors.white};
  }
`;

const MobileSearchForm = ({ onSearch }) => (
  <SearchForm
    css="margin: 0 1rem 1rem 1rem; display: flex; flex-wrap: nowrap;"
    onSearch={onSearch}
  >
    {({ currentValue, handleChange, handleSubmit }) => (
      <>
        <SearchInput
          aria-label="Search Fills"
          onChange={handleChange}
          placeholder="Search Fills"
          required
          type="search"
          value={currentValue}
        />
        <SearchButton onClick={handleSubmit} title="Search" type="submit">
          <SearchIcon height={16} width={16} />
        </SearchButton>
      </>
    )}
  </SearchForm>
);

MobileSearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MobileSearchForm;
