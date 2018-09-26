import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from './breadcrumb';
import Container from './container';
import media from '../styles/media';

const baseStyles = StyleSheet.create({
  breadcrumbContainer: {
    display: 'none',
    justifyContent: 'flex-end',
    [media.desktop]: {
      display: 'flex',
    },
  },
  title: {
    fontSize: '1.2em',
    margin: 0,
  },
  titleContainer: {
    order: 2,
    textAlign: 'center',
    [media.desktop]: {
      order: 'initial',
      textAlign: 'left',
    },
  },
  wrapper: {
    background: '#f4f4f4',
    padding: '20px 0',
  },
});

const ContentHeader = ({ breadcrumbItems, styles, subTitle, title }) => (
  <div className={css(baseStyles.wrapper, styles)}>
    <Container>
      <div className="row">
        <div className={`${css(baseStyles.titleContainer)} col-12 col-md-6`}>
          <h1 className={css(baseStyles.title)}>
            {title}
            {subTitle && <small className="text-muted"> {subTitle}</small>}
          </h1>
        </div>
        <div
          className={`${css(baseStyles.breadcrumbContainer)} col-12 col-md-6`}
        >
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
    </Container>
  </div>
);

ContentHeader.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  styles: PropTypes.arrayOf(PropTypes.string),
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ContentHeader.defaultProps = {
  styles: undefined,
  subTitle: undefined,
};

export default ContentHeader;
