import React from "react";
import { Card } from "react-bootstrap";
import "./Inicio3.css";

export default function Inicio3() {
  return (
    <div className="CardInfo">
      <div className="d-flex">
        <Card className="cards" style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://productos.mjmusic.com.ar/images/00000000BXREVERB53008BXREVERB.jpg"
          />
          <Card.Body>
            <Card.Title>Individuales</Card.Title>
            <Card.Text>
              Efectos, Multiefectos, chorus, overdrive, todo para tu pedalboard
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="d-flex">
        <Card className="cards" style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://productos.mjmusic.com.ar/images/00000000SBP30NAT49277SBP30NAT-1.jpg"
          />
          <Card.Body>
            <Card.Title>Bajos</Card.Title>
            <Card.Text>
              Cuerdas, eléctricas y acústicas, Fender - Parquer - LesPaul
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex">
        <Card className="cards" style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://productos.mjmusic.com.ar/images/000000000TEROSTD84937TEROSTD-1.jpg"
          />
          <Card.Body>
            <Card.Title>Guitarras</Card.Title>
            <Card.Text>
              Cuerdas, eléctricas y acústicas, Fender - Parquer - LesPaul
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
