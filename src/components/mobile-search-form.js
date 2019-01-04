import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import SearchForm from '../features/search/components/search-form';
import SearchIcon from './search-icon';

const SearchInput = styled.input`
  && {
    border: none;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    background-color: ${colors.martinique};
    color: ${colors.white};
    height: 34px;
    flex-grow: 1;
    font-size: 14px;
    padding: 0 0.7rem;
  }
`;

const SearchButton = styled.button`
  background-color: ${colors.stormGray};
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border: none;
  color: ${colors.violet};
  height: 34px;
  line-height: 1;
  padding: 0 0.75rem;

  &:hover {
    background-color: ${colors.white};
  }
`;

const MobileSearchForm = ({ onSearch }) => (
  <SearchForm
    css="margin: 0 16px 16px 16px; display: flex; flex-wrap: nowrap;"
    onSearch={onSearch}
  >
    {({ currentValue, handleChange, handleSubmit }) => (
      <React.Fragment>
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
      </React.Fragment>
    )}
  </SearchForm>
);

MobileSearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MobileSearchForm;
