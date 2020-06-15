import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

export const Menu = () => {
  return (
    <Nav className="ml-auto" navbar>
      <NavItem>
        <a href="/" className="link-item">
          <NavLink>Home</NavLink>
        </a>
      </NavItem>
    </Nav>
  );
};
