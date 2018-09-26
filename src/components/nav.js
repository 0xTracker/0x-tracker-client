import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { css, StyleSheet } from 'aphrodite';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import { URL } from '../constants';
import Container from './container';
import media from '../styles/media';
import Link from './link';
import logo from '../img/logo.png';
import NavLink from './nav-link';
import SearchForm from '../features/search/components/search-form';
import SettingsDialog from '../features/preferences/components/settings-dialog';

const styles = StyleSheet.create({
  navbar: {
    flexShrink: 0,
    paddingBottom: '13px',
    paddingTop: '13px',
  },
  settings: {
    display: 'block',
    [media.desktop]: {
      display: 'none',
    },
  },
});

class Nav extends PureComponent {
  constructor() {
    super();

    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = { collapsed: true, settingsVisible: false };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  handleSettingsClick() {
    this.setState({ settingsVisible: true });
  }

  handleToggle() {
    this.toggleCollapsed();
  }

  handleNavClick() {
    this.toggleCollapsed();
  }

  toggleCollapsed() {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  toggleSettings() {
    this.setState(prevState => ({ settingsVisible: !prevState.showSettings }));
  }

  render() {
    const { location } = this.props;
    const { collapsed, settingsVisible } = this.state;

    const createLink = (text, url) => (
      <NavLink
        currentUrl={location.pathname}
        onClick={this.handleNavClick}
        url={url}
      >
        {text}
      </NavLink>
    );

    return (
      <nav
        className={`${css(
          styles.navbar,
        )} navbar navbar-expand-lg navbar-dark bg-dark`}
      >
        <Container>
          <Link className="navbar-brand" href="/">
            <img
              alt="logo"
              className="d-inline-block align-top"
              height="30"
              src={logo}
            />
          </Link>
          <button
            className="navbar-toggler"
            onClick={this.handleToggle}
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={classNames({
              'navbar-collapse': true,
              collapse: collapsed,
            })}
            id="navigation"
          >
            <ul className="navbar-nav mr-auto">
              {createLink('Fills', URL.FILLS)}
              {createLink('Tokens', URL.TOKENS)}
              {createLink('Relayers', URL.RELAYERS)}
              {createLink('News & Updates', URL.NEWS)}
              {createLink('My Wallet', 'https://0xproject.com/portal/account')}
              <li>
                <Link
                  className={classNames('nav-link', css(styles.settings))}
                  onClick={this.handleSettingsClick}
                >
                  Settings
                </Link>
              </li>
            </ul>
            <SearchForm />
          </div>
        </Container>
        <SettingsDialog
          handleClose={this.toggleSettings}
          isOpen={settingsVisible}
        />
      </nav>
    );
  }
}

Nav.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

const enhance = compose(withRouter);

export default enhance(Nav);
