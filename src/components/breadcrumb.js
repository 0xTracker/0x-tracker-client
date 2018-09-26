import { css, StyleSheet } from 'aphrodite';
import PropTypes from 'prop-types';
import React from 'react';

import Link from './link';

const styles = StyleSheet.create({
  list: {
    margin: 0,
    background: 'none',
    padding: 0,
  },
});

const Breadcrumb = ({ items }) => (
  <nav aria-label="breadcrumb">
    <ol className={`${css(styles.list)} breadcrumb`}>
      <li className="breadcrumb-item">
        <Link href="/">Home</Link>
      </li>

      {items.map((item, index) => {
        if (index === items.length - 1) {
          return (
            <li
              aria-current="page"
              className="breadcrumb-item active"
              key={item.url}
            >
              {item.title}
            </li>
          );
        }

        return (
          <li className="breadcrumb-item" key={item.url}>
            <Link href={item.url}>{item.title}</Link>
          </li>
        );
      })}
    </ol>
  </nav>
);

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};

export default Breadcrumb;
