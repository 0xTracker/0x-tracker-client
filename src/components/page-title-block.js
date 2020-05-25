import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import SubTitle from './sub-title';
import Visible from './visible';

const Inner = styled.div`
  align-items: center;
  border-radius: 1px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  ${media.greaterThan('lg')`
  margin-bottom: 2rem;
  `};
`;

const Title = styled.h1`
  align-items: center;
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 18px;
  font-family: Cabin, -apple-system, BlinkMacSystemFont, segoe ui, roboto,
    oxygen, ubuntu, cantarell, fira sans, droid sans, helvetica neue, sans-serif;
  font-weight: 600;
  margin: 0;
  word-break: break-all;
`;

const Actions = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
`;

const PageTitleBlock = ({ actions, icon, subTitle, title }) => (
  <Inner>
    <Title>
      {icon && (
        <Visible above="xs">
          <div css="display: flex; margin-right: 12px;">{icon}</div>
        </Visible>
      )}
      <div>
        {title}
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </div>
    </Title>
    {actions ? <Actions>{actions}</Actions> : null}
  </Inner>
);

PageTitleBlock.propTypes = {
  actions: PropTypes.node,
  icon: PropTypes.node,
  subTitle: PropTypes.string,
  title: PropTypes.node.isRequired,
};

PageTitleBlock.defaultProps = {
  actions: undefined,
  icon: undefined,
  subTitle: undefined,
};

export default PageTitleBlock;
