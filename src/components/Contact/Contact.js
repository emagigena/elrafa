import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import contactos from "./contact.json";
import "./Contact.css";

const Contact = () => {
  const isMobile = window.innerWidth <= 767;

  const message = `¡Hola!, me gustaría realizar una consulta desde la pagina web, espero su respuesta con paciencia, muchas gracias`;
  return (
    <>
      {isMobile ? (
        <>
          <div style={{ marginTop: "40px" }}>
            <h1 className="text-2xl font-semibold text-black text-center">
              CONTACTÁ CON NOSOTROS
            </h1>

            <div className="bottom-textt-hours text-2xl font-bold text-black text-center">
              <h>Lun a Vie 8.30H a 12:30H - 16.30H 20.30H </h> <tr />{" "}
              <h>Sab de 8:30H a 12:30H.</h>
            </div>
          </div>
          <div className="contact-container">
            <Row xs={1} md={2} className="g-5 rowClass d-grid">
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
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
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
      ) : (
        <>
          <div style={{ marginTop: "40px" }}>
            <h1 className="text-2xl font-semibold text-black text-center">
              CONTACTÁ CON NOSOTROS
            </h1>

            <div className="bottom-textt-hours text-2xl font-bold text-black text-center">
              <p>
                Lun a Vie 8.30H a 12:30H - 16.30H 20.30H | Sab de 8:30H a
                12:30H.
              </p>
            </div>
          </div>
          <div className="contact-container">
            <Row xs={1} md={2} className="g-5 rowClass">
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
                          className="btn"
                          style={{ backgroundColor: "red", color: "white" }}
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
      )}
    </>
  );
};

export default Contact;
