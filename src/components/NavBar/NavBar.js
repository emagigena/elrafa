import React from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cart from "./CartWidget/CartWidget";
import logoinstrumental from "./logoinstrumental.png";
import { useCartContext } from "../Context/CartContext";

export default function NavBar() {
  const { productosAgregados } = useCartContext();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <NavLink to="/">
          <Image
            src={logoinstrumental}
            className="logoinstrumental"
            alt="logo"
            width="80"
            height="80"
          />
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {" "}
            <NavLink to="/categoria/EKO" className="nav-link">
              EKO
            </NavLink>
            <NavLink to="/categoria/DANELECTRO" className="nav-link">
              DANELECTRO
            </NavLink>
            <NavLink to="/categoria/TOKAI" className="nav-link">
              TOKAI
            </NavLink>
            <NavLink to="/categoria/LEONARD" className="nav-link">
              LEONARD
            </NavLink>
            <NavLink to="/categoria/STAGG" className="nav-link">
              STAGG
            </NavLink>
            <NavLink to="/categoria/EFNOTE" className="nav-link">
              EFNOTE
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link target="_blank" href="https://www.facebook.com/david.santafe.108">
              <i className="bi bi-facebook">   Página de Facebook</i>
            </Nav.Link>
            <Cart number={productosAgregados()} />
          </Nav>
        </Navbar.Collapse>{" "}
      </Container>
    </Navbar>
  );
}
