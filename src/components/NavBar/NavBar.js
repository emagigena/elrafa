import React from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cart from "./CartWidget/CartWidget";
import { useCartContext } from "../Context/CartContext";
import "./NavBar.css";

export default function NavBar() {
  const { productosAgregados } = useCartContext();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="ContainerNavbar"
    >
      <Container>
        <NavLink to="/">
          <Image
            src={
              "https://res.cloudinary.com/dhrfu31jp/image/upload/v1686603502/el%20rafa/logo-removebg-preview_5_pe3agn.png"
            }
            className="logoinstrumental"
            alt="logo"
            width="64"
            height="64"
          />
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/categoria/armas" className="nav-link text-white">
              Armas
            </NavLink>
            <NavLink to="/categoria/nautica" className="nav-link text-white">
              Náutica
            </NavLink>
            <NavLink to="/categoria/camping" className="nav-link text-white">
              Camping
            </NavLink>
            <NavLink to="/categoria/pesca" className="nav-link text-white">
              Pesca
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/elrafaarmeriaynautica"
            >
              <i className="bi bi-facebook"></i> Página de Facebook
            </Nav.Link>
            <Cart number={productosAgregados()} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
