import { Collection as AllIcon } from 'styled-icons/boxicons-regular/Collection.cjs';
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-use';

import { colors } from '../../../styles/constants';
import { URL } from '../../../constants';
import Link from '../../../components/link';
import ArticleSourcesProvider from './article-sources-provider';
import LoadingIndicator from '../../../components/loading-indicator';

const FilterItem = styled(Link)`
  border-bottom: 1px solid ${colors.selago};
  color: ${props => (props.active ? colors.violet : colors.stormGray)};
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;

  &:hover {
    background-color: ${colors.selago};
  }
`;

const FilterImage = styled.img.attrs({ alt: '' })`
  border-radius: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
`;

const ArticlesFilter = () => {
  const location = useLocation();

  return (
    <ArticleSourcesProvider>
      {({ loading, sources }) =>
        loading ? (
          <LoadingIndicator centered />
        ) : (
          <nav>
            <FilterItem active={location.pathname === URL.NEWS} href={URL.NEWS}>
              All
              <AllIcon height={20} width={20} />
            </FilterItem>
            {sources.map(source => {
              const sourceUrl = `${URL.NEWS}/${source.slug}`;

              return (
                <FilterItem
                  active={location.pathname === sourceUrl}
                  href={sourceUrl}
                  key={source.slug}
                >
                  {source.name}
                  <FilterImage src={source.imageUrl} />
                </FilterItem>
              );
            })}
          </nav>
        )
      }
    </ArticleSourcesProvider>
  );
};

export default ArticlesFilter;
