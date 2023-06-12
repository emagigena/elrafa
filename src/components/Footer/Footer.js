import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <Link to="/">
              <img src={"https://res.cloudinary.com/dhrfu31jp/image/upload/v1686603502/el%20rafa/logo-removebg-preview_5_pe3agn.png"} alt="" height="90" />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="footer-section">
              <h5 className="font-weight-bold">
                Cátalogo de productos de El Rafa Armeria y Náutica
              </h5>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="footer-section">
              <h5 className="font-weight-bold">Contáctanos</h5>
              <div className="black">
                <i className="bi bi-facebook"></i> Facebook:
              </div>
              <div>
                <i className="bi bi-instagram"></i> Instagram:
              </div>
              <div>
                <i className="bi bi-whatsapp"></i> WhatsApp
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            <div className="footer-section">
              <h5>© El Rafa™</h5>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="text-center mt-4">Developed by Emanuel Gigena</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
