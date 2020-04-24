import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { SearchIcon } from '../../../components/icons';
import SearchForm from '../../search/components/search-form';

const SearchInput = styled.input`
  && {
    border: none;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    background-color: ${COLORS.PRIMARY.SCAMPI_800};
    color: white;
    height: 2.5rem;
    flex-grow: 1;
    padding: 0 0.75rem;

    &::placeholder {
      color: ${COLORS.PRIMARY.SCAMPI_100};
    }
  }
`;

const SearchButton = styled.button`
  background-color: ${COLORS.PRIMARY.SCAMPI_800};
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  border: none;
  color: ${COLORS.PRIMARY.SCAMPI_100};
  height: 2.5rem;
  line-height: 1;
  padding: 0 0.75rem;

  &:hover,
  &:active {
    color: white;
  }
`;

const StyledSearchForm = styled(SearchForm)`
  display: flex;
  flex-wrap: nowrap;
  padding: 0 1rem;
`;

const MobileSearchForm = ({ onSearch }) => (
  <StyledSearchForm onSearch={onSearch}>
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
  </StyledSearchForm>
);

MobileSearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MobileSearchForm;
