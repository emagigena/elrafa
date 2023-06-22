import React from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import contactos from "./contact.json";
import "./Contact.css";
const message = `¡Hola!, me gustaría realizar una consulta, espero su respuesta con paciencia, muchas gracias`
const Contact = () => {
  return (
    <div className="contact-container">
      <Row xs={1} md={2} className="g-4 rowClass justify-content-center">
        {contactos.map((contacto, idx) => {
          const tipoContacto = Object.keys(contacto)[0];
          const datosContacto = contacto[tipoContacto];

          return (
            <Col key={idx} className="col-lg-3">
              <Card className="contact-card">
                <Carousel interval={3000} pause={false}>
                  <Carousel.Item>
                    <Card.Img
                      src={datosContacto.img[0]}
                      style={{ objectFit: "contain" }}
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <Card.Img
                      src={datosContacto.img[1]}
                      style={{ objectFit: "contain" }}
                    />
                  </Carousel.Item>
                </Carousel>
                <Card.Body>
                  <Card.Title>{datosContacto.nombre}</Card.Title>
                  <Card.Text>Teléfono: {datosContacto.telefono}</Card.Text>
                  <a
                    href={`https://wa.me/${datosContacto.telefono}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Contactar por WhatsApp
                  </a>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Contact;
