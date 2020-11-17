import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import Link from './link';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 0;
  padding: 1rem;

  &:hover {
    background-color: ${COLORS.NEUTRAL.MYSTIC_100};
  }
`;

const Metadata = styled.dl`
  color: ${COLORS.NEUTRAL.MYSTIC_800};
  display: flex;
  font-size: 14px;
  margin: 0;

  dt {
    display: none;
  }

  dd {
    display: inline-block;
    margin: 0;
    vertical-align: middle;
    overflow: hidden;
    flex-shrink: 0;

    &::after {
      content: '';
      border-radius: 50%;
      width: 0.25rem;
      height: 0.25rem;
      background-color: currentColor;
      display: inline-block;
      vertical-align: middle;
      margin: 0 0.5rem;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }
`;

const Heading = styled.span`
  font-size: 1rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EntityListItem = ({ complement, image, metadata, title, url }) => (
  <Wrapper as={Link} href={url}>
    <span css="display: flex; margin-right: 1rem;">{image}</span>
    <span css="display: flex; flex-direction: column; justify-content: center; flex-grow: 1; overflow: hidden;">
      <Heading>{title}</Heading>
      <Metadata>
        {metadata.map((x) => (
          <React.Fragment key={x.label}>
            <dt>{x.label}</dt>
            <dd>{x.value}</dd>
          </React.Fragment>
        ))}
      </Metadata>
    </span>
    {complement && <span css="text-align: right;">{complement}</span>}
  </Wrapper>
);

EntityListItem.propTypes = {
  complement: PropTypes.node,
  image: PropTypes.node.isRequired,
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.node.isRequired,
    }).isRequired,
  ).isRequired,
  title: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
};

EntityListItem.defaultProps = {
  complement: undefined,
};

export default EntityListItem;
