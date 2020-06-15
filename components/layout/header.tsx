import React, {useState} from "react";
import {Collapse, Navbar, NavbarToggler, NavbarBrand} from "reactstrap";
import {Menu} from "./menu";
import styled from "styled-components";

const CustomHeader = styled.header`
nav {
padding: 10px 0;
}
  .header-logo {
  height: 100px;
  }
`;

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <CustomHeader>
      <header className="bg-light">
        <div className="container">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
              <img className="header-logo" src="/odra-leather-logo.png" alt="Odra Leather Logo"/>
            </NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
              <Menu/>
            </Collapse>
          </Navbar>
        </div>
      </header>
    </CustomHeader>
  );
};
