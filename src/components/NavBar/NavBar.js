import React from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Cart from "./CartWidget/CartWidget";
import { useCartContext } from "../Context/CartContext";
import "./NavBar.css";
import armeria from "../Icons/armeria.png";
import municiones from "../Icons/municiones.png";
import nautica from "../Icons/nautica.png";
import pesca from "../Icons/pesca.png";

export default function NavBar() {
  const { productosAgregados } = useCartContext();

  // Verificar si estamos en un dispositivo móvil
  const isMobile = window.innerWidth <= 767;
  const isDesktop = window.innerWidth > 767;

  return (
    <>
      {isMobile ? (
        // Barra de navegación inferior para dispositivos móviles

        <Navbar
          fixed="bottom"
          bg="black"
          variant="light"
          className="ContainerNavbarMobile d-block d-lg-none"
          style={{ zIndex: 9999 }}
        >
          <Nav style={{ justifyContent: "center" }}>
            <NavLink
              to="/CATEGORÍA/ARMERÍA"
              className="nav-link text-white w-10 text-center"
            >
              <div className="nav-icon">
                <img
                  src={armeria}
                  alt="armeria"
                  className="nav-icon-img"
                  style={{ width: "50px", height: "50px" }}
                />
                <span
                  className="nav-icon-label"
                  style={{ color: "black", fontSize: "12px" }}
                >
                  <h style={{ fontWeight: 900 }}>ARMAS</h>
                </span>
              </div>
            </NavLink>
            <NavLink
              to="/CATEGORÍA/MUNICIONES"
              className="nav-link text-white w-10 text-center"
            >
              <div className="nav-icon">
                <img
                  src={municiones}
                  alt="municiones"
                  className="nav-icon-img"
                  style={{ width: "50px", height: "50px" }}
                />
                <span
                  className="nav-icon-label"
                  style={{ color: "black", fontSize: "12px" }}
                >
                  <h style={{ fontWeight: 900 }}>BALAS</h>
                </span>
              </div>
            </NavLink>
            <NavLink to="/" className="nav-link text-white w-10 text-center">
              <div className="nav-icon">
                <img
                  src={
                    "https://res.cloudinary.com/ddoc1iaed/image/upload/v1692795488/DESTACADAS/logo-removebg-preview_5_wj9h8h.png"
                  }
                  className="nav-icon-img"
                  alt="logo"
                  style={{ width: "45px", height: "45px" }}
                />
              </div>
              <span
                className="nav-icon-label"
                style={{ color: "black", fontSize: "12px" }}
              >
                <h style={{ fontWeight: 900 }}>INICIO</h>
              </span>
            </NavLink>

            <NavLink
              to="/CATEGORÍA/NÁUTICA"
              className="nav-link text-white w-10 text-center"
            >
              <div className="nav-icon">
                <img
                  src={nautica}
                  alt="nautica"
                  className="nav-icon-img"
                  style={{ width: "50px", height: "50px" }}
                />
                <span
                  className="nav-icon-label"
                  style={{ color: "black", fontSize: "12px" }}
                >
                  <h style={{ fontWeight: 900 }}>NÁUTICA</h>
                </span>
              </div>
            </NavLink>
            <NavLink
              to="/CATEGORÍA/PESCA"
              className="nav-link text-white w-10 text-center"
            >
              <div className="nav-icon">
                <img
                  src={pesca}
                  alt="pesca"
                  className="nav-icon-img"
                  style={{ width: "50px", height: "50px" }}
                />
                <span
                  className="nav-icon-label"
                  style={{ color: "black", fontSize: "12px" }}
                >
                  <h style={{ fontWeight: 900 }}>PESCA</h>
                </span>
              </div>
            </NavLink>
          </Nav>
        </Navbar>
      ) : isDesktop ? (
        // Barra de navegación superior para dispositivos no móviles
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
                  "https://res.cloudinary.com/ddoc1iaed/image/upload/v1692795488/DESTACADAS/logo-removebg-preview_5_wj9h8h.png"
                }
                className="logorafa"
                alt="logo"
                width="64"
                height="64"
              />
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <NavLink
                  to="/CATEGORÍA/ARMERÍA"
                  className="nav-link text-white"
                >
                  <span>ARMERÍA</span>
                </NavLink>
                <NavLink
                  to="/CATEGORÍA/MUNICIONES"
                  className="nav-link text-white"
                >
                  <span>MUNICIONES</span>
                </NavLink>
                <NavLink
                  to="/CATEGORÍA/NÁUTICA"
                  className="nav-link text-white"
                >
                  <span>NÁUTICA</span>
                </NavLink>
                <NavLink to="/CATEGORÍA/PESCA" className="nav-link text-white">
                  <span>PESCA</span>
                </NavLink>
                <NavLink to="/contacto" className="nav-link text-white">
                  <span>CONTACTANOS</span>
                </NavLink>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav style={{ textAlign: "center" }} className="ml-auto">
                <Cart number={productosAgregados()} />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        ""
      )}
    </>
  );
}
