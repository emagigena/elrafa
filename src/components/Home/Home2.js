import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./Home2.css";
import { Link } from "react-router-dom";
import home2 from "./home2.json";

export default function Home2() {
  return (
    <Container>
      <div className="contact-container">
        <Row xs={1} md={2} className="g-4 rowClass justify-content-center">
          {home2.map((areas, idx) => {
            const tipoContacto = Object.keys(areas)[0];
            const area = areas[tipoContacto];

            return (
              <Col key={idx} className="col-lg-3">
                <Card className="contact-card">
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
      </div>
    </Container>
  );
}
