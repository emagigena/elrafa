import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./Home2.css";
import { Link } from "react-router-dom";
import home2 from "./home2.json";

export default function Home2() {
  const isMobile = window.innerWidth <= 767;

  return (
    <div className="category-container">
      {isMobile ? (
        <Row xs={1} md={3} lg={5} className="g-5 rowClass d-grid">
          {home2.map((areas, idx) => {
            const tipoContacto = Object.keys(areas)[0];
            const area = areas[tipoContacto];

            return (
              <Col key={idx} className="col-lg-3">
                <Card className="category-card">
                  <Card.Img
                    src={area.img[0]}
                    style={{ objectFit: "contain" }}
                  />
                  <Card.Body>
                    <Card.Title>{area.nombre}</Card.Title>
                    <Card.Text>{area.text}</Card.Text>
                    <Link
                      to={area.to}
                      className="btn"
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      Ver productos
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row xs={1} md={3} lg={5} className="g-5 rowClass">
          {home2.map((areas, idx) => {
            const tipoContacto = Object.keys(areas)[0];
            const area = areas[tipoContacto];

            return (
              <Col key={idx} className="col-lg-3">
                <Card className="category-card">
                  <Card.Img
                    src={area.img[0]}
                    style={{ objectFit: "contain" }}
                  />
                  <Card.Body>
                    <Card.Title>{area.nombre}</Card.Title>
                    <Card.Text>{area.text}</Card.Text>
                    <Link
                      to={area.to}
                      className="btn"
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      Ver productos
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}
