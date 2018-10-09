import _ from 'lodash';
import {
  Collapse,
  Nav as BootstrapNav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';
import React, { Component } from 'react';
import styled from 'styled-components';

import { URL } from '../constants';
import Container from './container';
import Hidden from './hidden';
import Link from './link';
import logo from '../img/logo.png';
import NavLink from './nav-link';
import SearchForm from '../features/search/components/search-form';
import SettingsDialog from '../features/preferences/components/settings-dialog';

const StyledNav = styled(Navbar).attrs({
  color: 'dark',
  dark: true,
  expand: 'lg',
})`
  flex-shrink: 0;
  padding-bottom: 13px;
  padding-top: 13px;
`;

const Logo = styled.img.attrs({ src: logo })`
  display: inline-block;
  height: 30px;
`;

class Nav extends Component {
  constructor() {
    super();

    this.state = { collapsed: true, settingsVisible: false };
    this.handleClickedLink = this.handleClickedLink.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }

  handleSettingsClick() {
    this.setState({ settingsVisible: true });
  }

  handleToggle() {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  handleClickedLink() {
    this.setState({ collapsed: true });
  }

  toggleSettings() {
    this.handleClickedLink();
    this.setState(prevState => ({ settingsVisible: !prevState.showSettings }));
  }

  render() {
    const { collapsed, settingsVisible } = this.state;

    const createLink = (text, href, onClick = _.noop) => (
      <NavLink
        href={href}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => {
          this.handleClickedLink();
          onClick();
        }}
      >
        {text}
      </NavLink>
    );

    return (
      <StyledNav>
        <Container>
          <NavbarBrand href="/" tag={Link}>
            <Logo />
          </NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={!collapsed} navbar>
            <BootstrapNav className="mr-auto" navbar>
              {createLink('Fills', URL.FILLS)}
              {createLink('Tokens', URL.TOKENS)}
              {createLink('Relayers', URL.RELAYERS)}
              {createLink('News & Updates', URL.NEWS)}
              {createLink('My Wallet', 'https://0xproject.com/portal/account')}
              <Hidden above="md">
                {createLink('Settings', undefined, this.handleSettingsClick)}
              </Hidden>
            </BootstrapNav>
            <SearchForm />
          </Collapse>
        </Container>
        <SettingsDialog
          handleClose={this.toggleSettings}
          isOpen={settingsVisible}
        />
      </StyledNav>
    );
  }
}

export default Nav;
