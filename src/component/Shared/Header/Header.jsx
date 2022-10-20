import React from "react";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import { Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="py-3 sticky-top"
    >
      <Container>
        <Link
          className="fw-bold fs-4 text-secondary text-decoration-none"
          to="/"
        >
          Elite Photographer
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto text-center gap-4">
            <MenuItems />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
