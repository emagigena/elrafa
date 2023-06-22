import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import contactos from "./contact.json";
import "./Contact.css";

const Contact = () => {
  const message = `¡Hola!, me gustaría realizar una consulta, espero su respuesta con paciencia, muchas gracias`;
  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <h1 className="text-2xl font-semibold text-black text-center">
          CONTACTÁ CON NOSOTROS
        </h1>
      </div>
      <div className="contact-container">
        <Row xs={1} md={2} className="g-4 rowClass justify-content-center">
          {contactos.map((contacto, idx) => {
            const tipoContacto = Object.keys(contacto)[0];
            const datosContacto = contacto[tipoContacto];

            return (
              <Col key={idx} className="col-lg-3">
                <Card className="contact-card">
                  <Card.Img
                    src={datosContacto.img[0]}
                    style={{ objectFit: "contain" }}
                  />
                  <Card.Body>
                    <Card.Title>{datosContacto.nombre}</Card.Title>
                    <a
                      href={`https://wa.me/${
                        datosContacto.telefono
                      }?text=${encodeURIComponent(message)}`}
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
    </>
  );
};

export default Contact;
