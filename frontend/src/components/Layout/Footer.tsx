import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import { SourceLink } from '@/components/SourceLink';

export const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2019 © Ray Andrew based on <SourceLink>Reduction theme</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};
