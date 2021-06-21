import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          Sistema Administrativo DSI-2021_G01<SourceLink></SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
